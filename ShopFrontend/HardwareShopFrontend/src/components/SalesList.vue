<template>
  <div class="sales-list">
    <h3>Sales Transactions</h3>
    <ul>
      <li v-for="s in sales" :key="s.id">
        <strong>{{ s.product_Name }}</strong>
        <span>Qty: {{ s.product_Quantity }}</span>
        <span class="date">{{ new Date(s.sale_Date).toLocaleString() }}</span>
      </li>
    </ul>
  </div>
</template>





<script setup>
// ✅ Destructure to avoid unused variable warning
const { sales } = defineProps(['sales'])
</script>








<style scoped>
.sales-list {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 8px;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.sales-list h3 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #333;
}

/* Scrollable list wrapper */
.sales-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 350px; /* adjust this height as needed */
  scrollbar-width: thin;
  scrollbar-color: #ccc transparent;
}

.sales-list ul::-webkit-scrollbar {
  width: 6px;
}

.sales-list ul::-webkit-scrollbar-thumb {
  background-color: #ccc;
  border-radius: 4px;
}

.sales-list li {
  padding: 10px;
  border-bottom: 1px solid #e0e0e0;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.sales-list li:last-child {
  border-bottom: none;
}

.sales-list span {
  color: #666;
  font-size: 0.95rem;
}

.sales-list .date {
  font-style: italic;
  font-size: 0.9rem;
  color: #999;
}

.sales-list ul {
  list-style: none;
  padding: 0;
  margin: 0;
}
</style>
