<script setup lang="ts">
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/vue'
import { ChevronDoubleRightIcon } from '@heroicons/vue/24/solid'
import numeral from 'numeral'

interface Total {
  value: string
}

interface Product {
  name: string
}

interface Item {
  quantity: string
  product: Product
  total: Total
}

interface Order {
  invoiceNumber: string
  dueDate: string
  customer: string
  items: Array<Item>
  amountDue: string
}

defineProps({
  orders: Array<Order>,
})

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
    currency: {
      symbol: 'Rp',
    },
  })
}
if (numeral.locale() !== 'id') {
  numeral.locale('id')
}
</script>

<template>
  <div class="bg-[#0070ba] p-4 text-xl shadow-xl shadow-indigo-100 backdrop-blur-xl dark:bg-black dark:shadow-none">
    <div class="">
      <span class="bg-gradient-to-b from-slate-50 to-slate-200 bg-clip-text text-transparent">
        <table
          class="w-full border-collapse border border-slate-400 bg-slate-100 text-sm shadow-lg backdrop-blur-xl dark:border-slate-500 dark:bg-slate-800"
        >
          <thead class="bg-slate-50 dark:bg-slate-700">
            <tr>
              <th
                class="w-1/2 border-y border-l border-slate-300 p-4 text-left font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200"
              >
                No. Invoice
              </th>
              <th
                class="w-1/2 border-y border-r border-slate-300 p-4 text-right font-semibold text-slate-900 dark:border-slate-600 dark:text-slate-200"
              >
                Kekurangan
              </th>
            </tr>
          </thead>
          <tbody v-for="(order, orderIndex) in orders" :key="orderIndex">
            <tr>
              <td
                class="border-y border-l border-slate-300 p-4 text-left text-slate-500 dark:border-slate-700 dark:text-slate-400"
              >
                <span class="font-semibold"> #{{ order.invoiceNumber }} </span><br>
                <span class="line-clamp-1 text-xs font-light">{{
                  order.customer
                }}</span>
                <div class="mt-2 text-left text-xs">
                  <span class="mr-0.5 font-medium">untuk</span><br>
                  <span class="font-light">
                    {{
                      new Date(order.dueDate).toLocaleDateString("id-ID", {
                        day: "numeric",
                        month: "long",
                      })
                    }}
                  </span>
                </div>
                <Disclosure v-slot="{ open }" as="div">
                  <DisclosureButton
                    class="mt-3 flex w-fit justify-start rounded-lg text-left text-sm focus:outline-none"
                  >
                    <span class="text-xs" :class="open ? 'font-light' : 'font-semibold'">detail</span>
                    <ChevronDoubleRightIcon
                      :class="open ? 'rotate-90 transform' : ''"
                      class="mt-[2px] ml-0.5 h-3 w-3 font-thin transition-transform"
                    />
                  </DisclosureButton>
                  <div v-if="open" :key="orderIndex">
                    <DisclosurePanel v-slot="{ close }" class="text-xs transition">
                      <ul
                        v-for="(item, itemIndex) in order.items" :key="itemIndex" :tabindex="itemIndex"
                        class="text-left"
                      >
                        <li class="my-1 first:mt-2 last:mb-2">
                          <div class="font-medium">
                            {{ item.quantity }} unit {{ item.product.name }}
                          </div>
                          <div class="font-light">
                            {{ numeral(item.total.value.replace(/.00$/, '').replace(/,/, '').replace(/,/, '')).format('$0,0') }}
                          </div>
                        </li>
                      </ul>
                    </DisclosurePanel>
                  </div>
                </Disclosure>
              </td>
              <td
                class="border-y border-r border-slate-300 p-4 text-right text-slate-500 dark:border-slate-700 dark:text-slate-400"
              >
                <span class="font-light">{{ numeral(order.amountDue.replace(/.00$/, '').replace(/,/, '').replace(/,/, '')).format('$0,0') }}</span><br>
              </td>
            </tr>
          </tbody>
        </table>
      </span>
    </div>
    <div class="mt-1 -mb-2">
      <span class="text-xs font-light text-slate-200 opacity-50">Order yang Sedang Berjalan</span>
    </div>
  </div>
</template>
