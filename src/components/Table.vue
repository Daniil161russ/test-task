<template>
	<div class="table w-full">
		<input type="text" placeholder="Поиск" v-model="search" class="border-2 border-gray-600 m-2 p-1 outline-none"/>
		<h1 class="text-3xl m-2">Таблица альбомов</h1>
		<table class="w-full">
			<thead>
				<tr class="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
					<th class="px-4 py-3 hover:underline cursor-pointer" v-for="(column, key) in columns" :key="key" @click="sortBy(column)">
						{{column}}
					</th>
				</tr>
			</thead>
			<tbody class="bg-white">
				<template v-for="(list, index) in filteredItems">
					<tr class="text-gray-700" :key="list.id" :class="{'bg-red-500' : list.id === selectedRow}">
						<td class="px-4 py-3 border">
							{{list.id}}
						</td>
						<td class="px-4 py-3 text-ms font-semibold border">
							{{list.title}}
						</td>
						<td class="px-4 py-3 text-xs border">
							{{list.userId}}
						</td>
						<td class="px-4 py-3 text-sm border">
							<div class="flex justify-center">
								<div class="w-5 rounded-full bg-green-500 mr-4  cursor-pointer flex justify-center" @click="showInfo(list)">
									<span class="text-white">+</span>
								</div>
								<div class="w-5 rounded-full bg-red-500 cursor-pointer flex justify-center" @click="mark(list.id)">
									<span class="text-white">-</span>
								</div>
							</div>
						</td>
					</tr>
					<template v-if="showing.includes(list.id)">
            <tr :key="index">
              <td colspan=4>
                <AdditionalInfo :data="list" :showingColums="showingColums"/>
              </td>
            </tr>
          </template>
				</template>
			</tbody>
		</table>
		<div class="flex items-center justify-center mt-8">
			<button @click="prevPage" :disabled="pageNumber === 1" class="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300 m-6">
				Назад
			</button>
			<ul class="pagination flex justify-center">
				<li v-for="(page, index) in pageCount" :key="index" class="pr-4">
					<a v-bind:key="page" href="#" @click="setPage(page)" class="hover:text-blue-500" :class="{'text-blue-500' : page === pageNumber}">{{ page }}</a>
				</li>
			</ul>
			<button @click="nextPage" :disabled="pageNumber >= pageCount" class="p-2 pl-5 pr-5 bg-blue-500 text-gray-100 text-lg rounded-lg focus:border-4 border-blue-300 m-6">
				Далее
			</button>
		</div>
	</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
	name: "DataTable",
	components: { AdditionalInfo: () => import("@/components/AdditionalInfo")},
	props:{
    size:{
      type:Number,
      required:false,
      default: 10
    }
	},
	data: () => ({
		columns: ['№', 'Заголовок', 'ID Пользователя', 'Действие'],
		showingColums: ['URL', 'Заголовок'],
		search: "",
		showing: [],
		pageNumber: 1,
		selectedRow: null
	}),
	created() {
    this.fetchLists()
  },
	computed: {
		...mapGetters({
      lists: "table/getTableList",
    }),
		pageCount(){
      let l = this.lists.length,
          s = this.size;
      return Math.ceil(l/s);
		},
		filteredItems() {
			const start = (this.pageNumber - 1) * this.size,
						end = start + this.size;
			return this.lists.filter(list => {
				return (
					list.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1 ||
					list.userId.toString().indexOf(this.search.toLowerCase()) > -1 
				);
			}).slice(start, end)
    },
	},
	methods: {
		...mapActions({
			fetchLists: "table/fetchTableList",
      fetchPhotos: "table/fetchPhotos",
    }),
		showInfo(item) {
      const index = this.showing.indexOf(item.id)
      if(index > -1) {
        this.showing.splice(index, 1)
      } else {
        this.showing.push(item.id)
        this.fetchPhotos(item.id)
      }
    },
		sortBy(col) {
			if (col === "№") this.lists.sort((a, b) => !b.id - a.id)
			if (col === "ID Пользователя") this.lists.sort((a, b) => !b.userId - a.userId)
			if (col === "Заголовок") this.lists.sort((a, b) => a.title !== b.title ? a.title < b.title ? -1 : 1 : 0)
			return 0;
		},
		mark(row) {
			if ( this.selectedRow == row)  return this.selectedRow = null
			return this.selectedRow = row;
		},
		nextPage(){
      this.pageNumber++;
    },
		prevPage(){
			this.pageNumber--;
		},
		setPage(page) {
			this.pageNumber = page;
		}
	}
}
</script>