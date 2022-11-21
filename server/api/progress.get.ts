import numeral from 'numeral'

export default async (req, res) => {
  const headers = {
    'Authorization': `Bearer ${useRuntimeConfig().API_AUTH_TOKEN}`,
    'Cache-Control': 'no-cache',
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  }

  const query = {
    query: `
      query($businessId: ID!, $page: Int!, $pageSize: Int!) {
        business(id: $businessId) {
          id
          invoices(page: $page, pageSize: $pageSize) {
            pageInfo {
              currentPage
              totalPages
              totalCount
            }
            edges {
              node {
                id
                invoiceNumber
                invoiceDate
                status
                dueDate
                amountDue {
                  value
                  currency {
                    symbol
                  }
                }
                amountPaid {
                  value
                  currency {
                    symbol
                  }
                }
                total {
                  value
                  currency {
                    symbol
                  }
                }
                items {
                  product {
                    id
                    name
                  }
                  quantity
                  price
                  total {
                    value
                  }
                }
                customer {
                  name
                  firstName
                  lastName
                }
              }
            }
          }
        }
      }
      `,
    variables: {
      businessId: `${useRuntimeConfig().BUSINESS_ID}`,
      page: 1,
      pageSize: 500,
    },
  }

  if (numeral.locales.id === undefined) {
    numeral.register('locale', 'id', {
      delimiters: {
        thousands: '.',
        decimal: ',',
      },
      abbreviations: {
        thousand: 'k',
        million: 'm',
        billion: 'b',
        trillion: 't',
      },
      ordinal(number) {
        return number === 1 ? 'er' : 'ème'
      },
      currency: {
        symbol: 'Rp',
      },
    })
  }
  if (numeral.locale() !== 'id')
    numeral.locale('id')

  return await $fetch(useRuntimeConfig().API_URL, {
    method: 'POST',
    headers,
    body: query,
    parseResponse: JSON.parse,
    async onRequest({ request, options }) {
      // Log request
      // console.log("[fetch request]", request, options);
      // Add `?t=1640125211170` to query params
      // options.params = options.params;
      // options.params.t = new Date();
    },
    async onRequestError({ request, options, error }) {
      // Log error
      // console.log("[fetch request error]", request, error);
    },
    async onResponse({ request, response, options }) {
      // Log response
      // console.log("[fetch response]", request, response.status, response.body);
    },
    async onResponseError({ request, response, options }) {
      // Log error
      // console.log(
      //   "[fetch response error]",
      //   request,
      //   response.status,
      //   response.body
      // );
    },
  })
    .then((data) => {
      // console.log(data);

      const on_progress = []
      const invoices = data.data.business.invoices.edges
      const pageInfo = data.data.business.invoices.pageInfo
      // console.log(invoices);
      // return invoices;
      // console.log(pageInfo);

      if (pageInfo.totalCount > 0) {
        for (const invoice_no in invoices) {
          // console.log(invoices);
          // console.log(`invoice no: ${invoice_no}`);
          const invoice = invoices[invoice_no].node
          const status = invoice.status

          if (
            status === 'PARTIAL'
            || status === 'OVERDUE'
            || status === 'SENT'
          ) {
            // console.log(invoiceNumber);
            // console.log(amountDue);

            // let node = invoice;
            const invoiceNumber = invoice.invoiceNumber
            const total = invoice.total.value
            const amountDue = invoice.amountDue.value
            const customer = invoice.customer.name
            const items = invoice.items
            const dueDate = invoice.dueDate

            on_progress.push({
              invoiceNumber,
              total,
              amountDue,
              customer,
              items,
              dueDate,
              status,
              // node: node,
            })
          }
        }
      }

      // divide by 2 to represent actual version

      return on_progress
    })
    .catch(error => error.data)
}
