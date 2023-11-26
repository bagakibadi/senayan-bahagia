// File: your-script.js

// Fungsi untuk membaca data dari file JSON
async function fetchData() {
    try {
      const response = await fetch('./data.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching data:', error.message);
      return { tasks: [] };
    }
  }
  
  // Fungsi untuk menyimpan data ke file JSON
  async function saveData(data) {
    try {
      const response = await fetch('./data.json', {
        method: 'PUT', // atau 'POST' tergantung kebutuhan
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
  
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      console.log('Data saved successfully.');
    } catch (error) {
      console.error('Error saving data:', error.message);
    }
  }
  
  // Fungsi untuk menambahkan tugas baru
  function addTask(newTask) {
    fetchData().then(data => {
      console.log(data)
      newTask.id = generateUniqueId(data.data);
      data.data.push(newTask);
      saveData(data);
    });
  }
  
  // Fungsi untuk mendapatkan semua tugas
  function getAllTasks() {
    return fetchData().then(data => data.data);
  }
  
  // Fungsi untuk memperbarui status tugas
  function updateTaskStatus(id, completed) {
    fetchData().then(data => {
      const task = data.tasks.find(task => task.id === id);
      if (task) {
        task.completed = completed;
        saveData(data);
      }
    });
  }
  
  // Fungsi untuk menghapus tugas berdasarkan ID
  function deleteTask(id) {
    fetchData().then(data => {
      data.tasks = data.tasks.filter(task => task.id !== id);
      saveData(data);
    });
  }
  
  // Fungsi bantu untuk menghasilkan ID unik
  function generateUniqueId(tasks) {
    const existingIds = tasks.map(task => task.id);
    let newId = 1;
  
    while (existingIds.includes(newId)) {
      newId++;
    }
  
    return newId;
  }

  document.addEventListener('DOMContentLoaded', () => {
    // Tampilkan data pertama kali
    if(!window.location.href.includes('product')) {
      displayTasks();
      console.log('b')
    } else {
      console.log('a')
      displayTable()
    }
  });
  async function displayTasks() {
    // Mendapatkan semua tugas
    const tasks = await getAllTasks();
  
    // Mendapatkan elemen tbody dari tabel
    const taskListElement = document.getElementById('taskList');
    console.log(taskListElement)
  
    // Mengosongkan isi dari task list
    taskListElement.innerHTML = '';
  
    // Loop melalui setiap tugas dan tambahkan ke dalam tabel
    const a = "<li>asd</li>";
    tasks.forEach(task => {
      taskList.insertAdjacentHTML('beforeend', `<li
      class="product type-product post-199 status-publish first instock product_cat-blonde-ale product_cat-golden has-post-thumbnail featured downloadable shipping-taxable purchasable product-type-simple"
    >
      <div class="btWooShopLoopItemInner">
        <div
          class="bt_bb_image bt_bb_target_self"
          data-bt-override-class="{}"
        >
          <img
              width="400"
              height="800"
              src="${task.images}"
              class="attachment-woocommerce_thumbnail size-woocommerce_thumbnail"
              title="product_06"
              decoding="async"
              fetchpriority="high"
          />
        </div>
        <header
          class="bt_bb_headline bt_bb_superheadline bt_bb_superheadline_outside bt_bb_subheadline bt_bb_size_extrasmall"
          data-bt-override-class="{}"
        >
          <h2 class="bt_bb_headline_tag">
            <span class="bt_bb_headline_content"
              ><span
                ><p
                  title="${task.title}"
                  style="margin-bottom: 0"
                  >${task.title}</p
                ></span
              ></span
            >
          </h2>
          <div class="bt_bb_headline_subheadline">
            <span class="btNoStarRating"></span>
          </div>
        </header>
        <span class="price"
          ><span class="woocommerce-Price-amount amount"
            ><bdi
              >${task.harga}</bdi
            ></span
          ></span
        >
        <a
          data-quantity="1"
          class="button wp-element-button product_type_simple"
          aria-label="Add &ldquo;Alchemist Ale&rdquo; to your cart"
          rel="nofollow"
          onclick="beliProduct('${task.title}')"
          >Beli</a
        >
      </div>
    </li>`) 
    });
  }
  function beliProduct(item) {
    const URL = `https://api.whatsapp.com/send?phone=6285858690819&text=Hallo%20Admin%20Senayan%20Bahagia!%0A%0ASaya%20ingin%20membeli%20Produk%20%3A%0A%0A${item}%0A%0AApakah%20Tersedia!`
    window.open(URL, '_blank');
  }

  async function displayTable() {
    // Mendapatkan semua tugas
    const tasks = await getAllTasks();
  
    // Loop melalui setiap tugas dan tambahkan ke dalam tabel
    tasks.forEach(task => {
      console.log(task)
      product.insertAdjacentHTML('beforeend', `<tr><td>${task.title}</td><td>${task.harga}</td></tr>`) 
    });
  }
    
  function tambah() {
    const title = document.getElementById('Title').value
    const harga = document.getElementById('Harga').value
    const image = document.getElementById('Image').value

    const newProduct = {title:title, harga:harga, images:image}
    addTask(newProduct)
  }
  // Contoh cara menggunakannya
//   async function exampleUsage() {
//     // Menambahkan tugas baru
//     const newTask = { title: 'Mengerjakan Proyek', completed: false };
//     addTask(newTask);
  
//     // Mendapatkan semua tugas
//     const allTasks = await getAllTasks();
//     console.log('All tasks:', allTasks);
  
//     // Memperbarui status tugas dengan ID tertentu
//     const taskIdToUpdate = 1;
//     updateTaskStatus(taskIdToUpdate, true);
  
//     // Menghapus tugas dengan ID tertentu
//     const taskIdToDelete = 2;
//     deleteTask(taskIdToDelete);
//   }
  
//   // Panggil fungsi exampleUsage() atau fungsi lain yang membutuhkan data
//   exampleUsage();
  