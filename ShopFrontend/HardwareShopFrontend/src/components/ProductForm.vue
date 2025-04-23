<template>
  <form @submit.prevent="handleSubmit" class="product-form">
    <h3>{{ isEditing ? 'Update' : 'Add' }} Product</h3>

    <input v-model="name" placeholder="Product name" required class="input-field" />
    <input
      v-model.number="quantity"
      type="number"
      placeholder="Quantity"
      required
      class="input-field"
    />
    <div class="button-group">
      <button type="submit" class="btn primary">
        {{ isEditing ? 'Update' : 'Add' }}
      </button>

      <button type="button" v-if="isEditing" @click="cancelEdit" class="btn secondary">
        Cancel
      </button>
    </div>
  </form>
</template>







<script setup>
import { ref, watch } from 'vue'
import axios from 'axios'

const props = defineProps(['selectedProduct'])
const emit = defineEmits(['refresh', 'update:selectedProduct'])

const name = ref('')
const quantity = ref(0)
const productId = ref(null)
const isEditing = ref(false)

watch(
  () => props.selectedProduct,
  (newProduct) => {
    if (newProduct) {
      name.value = newProduct.product_Name
      quantity.value = newProduct.product_Quantity
      productId.value = newProduct.product_Id
      isEditing.value = true
    }
  }
)

async function handleSubmit() {
  if (isEditing.value) {
    await axios.put(`http://localhost:5000/api/products/${productId.value}`, {
      Product_Name: name.value,
      Product_Quantity: quantity.value,
    })
  } else {
    await axios.post('http://localhost:5000/api/products', {
      Product_Name: name.value,
      Product_Quantity: quantity.value,
    })
  }

  resetForm()
  emit('refresh')
}

function cancelEdit() {
  resetForm()
}

function resetForm() {
  name.value = ''
  quantity.value = 0
  productId.value = null
  isEditing.value = false
  emit('update:selectedProduct', null)
}
</script>






<style scoped>
.product-form {
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.08);
}

.product-form h3 {
  margin-bottom: 10px;
  font-size: 1.5rem;
  color: #333;
}

.input-field {
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 6px;
  font-size: 1rem;
  transition: border-color 0.3s;
}

.input-field:focus {
  outline: none;
  border-color: #4caf50;
}

.button-group {
  display: flex;
  gap: 10px;
}

.btn {
  padding: 8px 16px;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 6px;
  transition: background-color 0.3s;
}

.btn.primary {
  background-color: #4caf50;
  color: white;
}

.btn.primary:hover {
  background-color: #43a047;
}

.btn.secondary {
  background-color: #e0e0e0;
  color: #333;
}

.btn.secondary:hover {
  background-color: #d5d5d5;
}
</style>


