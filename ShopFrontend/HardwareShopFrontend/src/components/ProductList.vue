<template>
  <div class="product-list">
    <h3>Product List</h3>
    <ul>
      <li v-for="p in products" :key="p.product_Id" class="product-item">
        <span class="product-info">
          {{ p.product_Name }} - ({{ p.product_Quantity }})
        </span>
        <div class="button-group">
          <button @click="deleteProduct(p.product_Id)" class="btn delete">Delete</button>
          <button @click="startEdit(p)" class="btn edit">Edit</button>
        </div>
      </li>
    </ul>
  </div>
</template>






<script setup>
import axios from 'axios'

const { products } = defineProps(['products'])
const emit = defineEmits(['refresh', 'edit'])

async function deleteProduct(id) {
  await axios.delete(`http://localhost:5000/api/products/${id}`)
  emit('refresh')
}

function startEdit(product) {
  emit('edit', product)
}
</script>








<style scoped>
.product-list {
  padding: 20px;
}

.product-list h3 {
  font-size: 1.5rem;
  margin-bottom: 12px;
  color: #333;
}

ul {
  list-style: none;
  padding: 0;
}

.product-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f8f9fa;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px;
  margin-bottom: 10px;
  transition: box-shadow 0.3s ease;
}

.product-item:hover {
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.08);
}

.product-info {
  font-size: 1rem;
  font-weight: 500;
  color: #444;
}

.button-group {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 6px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.3s ease;
}

.btn.delete {
  background-color: #e74c3c;
  color: white;
}

.btn.delete:hover {
  background-color: #c0392b;
}

.btn.edit {
  background-color: #3498db;
  color: white;
}

.btn.edit:hover {
  background-color: #2980b9;
}
</style>




