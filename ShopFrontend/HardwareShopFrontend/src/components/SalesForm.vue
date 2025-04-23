<template>
  <form @submit.prevent="recordSale" class="sales-form">
    <h3>Record Sale</h3>
    <select v-model="productId" required>
      <option value="" disabled>Select Product</option>
      <option v-for="p in products" :value="p.product_Id" :key="p.product_Id">
        {{ p.product_Name }} (Stock: {{ p.product_Quantity }})
      </option>
    </select>
    <input v-model.number="quantity" type="number" placeholder="Quantity" required />
    <button type="submit">Record</button>
  </form>
</template>




<script setup>
import { ref } from 'vue'
import axios from 'axios'

const { products } = defineProps(['products'])
const emit = defineEmits(['refresh'])

const productId = ref('')
const quantity = ref(1)

async function recordSale() {
  try {
    await axios.post('http://localhost:5000/api/sales', {
      Product_Id: productId.value,
      Quantity: quantity.value,
    })
    productId.value = ''
    quantity.value = 1
    emit('refresh')
  } catch (err) {
    alert(err.response?.data?.message || 'Sale failed')
  }
}
</script>




<style scoped>
.sales-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  background: #f9f9f9;
  border-radius: 8px;
}

.sales-form h3 {
  font-size: 1.5rem;
  margin-bottom: 8px;
  color: #333;
}

.sales-form select,
.sales-form input {
  padding: 8px 10px;
  font-size: 1rem;
  border: 1px solid #ccc;
  border-radius: 6px;
}

.sales-form button {
  padding: 10px;
  font-size: 1rem;
  background-color: #2ecc71;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.sales-form button:hover {
  background-color: #27ae60;
}
</style>
