<template>
  <div class="dashboard">
    <h1 class="dashboard-title">Mini Hardware Shop</h1>
    <div class="dashboard-sections">
      <!-- Product Section -->
      <div class="card">
        <ProductForm
          :selectedProduct="editableProduct" 
          @refresh="loadProducts"
          @update:selectedProduct="val => editableProduct = val"
        /> 

        <!-- Prop to child , Emit to parent ,  Updating prop -->
         <!-- 
         1. What is @update:propName in Vue?
               
         Parent.vue:
                <ChildComponent v-model:someProp="myValue" />        ---- Updating prop value

         This is equivalent to:        
                <ChildComponent :someProp="myValue" @update:someProp="myValue = $event" />    ----Another way of Updating the prop value 
                or
                <ChildComponent :someProp="myValue" @update:someProp="val => myValue = val" />    -----Another way of updating the prop value
         -->


        <ProductList
          :products="products"
          @refresh="loadProducts"
          @edit="editableProduct = $event"
        />
      </div>


      <!-- Sales Section -->
      <div class="card">
        <SalesForm v-bind:products="products" v-on:refresh="loadAll" />
        <SalesList v-bind:sales="sales" class="sales-list" />
      </div>
    </div>
  </div>
</template>





<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

import ProductForm from '../components/ProductForm.vue'
import ProductList from '../components/ProductList.vue'
import SalesForm from '../components/SalesForm.vue'
import SalesList from '../components/SalesList.vue'

const products = ref([])
const sales = ref([])
const editableProduct = ref(null)

async function loadProducts() {
  const res = await axios.get('https://shop-backend-sfmi.onrender.com/api/products')
  products.value = res.data
}

async function loadSales() {
  const res = await axios.get('https://shop-backend-sfmi.onrender.com/api/sales')
  sales.value = res.data
}

function loadAll() {
  loadProducts()
  loadSales()
}

onMounted(loadAll)
</script>







<style scoped>
.dashboard {
  padding: 20px;
  background-color: #f4f4f4;
  min-height: 100vh;
}

.dashboard-title {
  text-align: center;
  font-size: 2rem;
  color: #333;
  margin-bottom: 20px;
}

.dashboard-sections {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
}

.card {
  flex: 1;
  min-width: 300px;
  max-width: 500px;
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
}

.sales-list {
  height: 500px;
}
</style>
