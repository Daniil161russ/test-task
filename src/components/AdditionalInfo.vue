<template>
	<table class="w-full">
    <thead>
      <tr>
				<th v-for="title in showingColums" :key="title.id" class="bg-blue-100 border text-left md:px-4 md:py-2">
					{{ title }}
				</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in photos" :key="item.id" >
        <td class="border md:px-8 md:py-4">
          {{ item.url }}
        </td>
				<td class="border md:px-8 md:py-4">
          {{ item.title }}
        </td>
      </tr>
    </tbody>
  </table>
</template>
<script>
export default {
	name: "AdditionalInfo",
	props: ["showingColums", "data"],
	data:() => ({
    photos: []
  }),
	created() {
    this.unsubscribe = this.$store.subscribe((mutation) => {
      if (mutation.type === 'table/setPhotos') {
        this.photos = this.data.photos
      }
    });
  },
	beforeDestroy() {
    this.unsubscribe();
  },
}
</script>