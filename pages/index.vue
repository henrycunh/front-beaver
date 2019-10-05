<template>
	<div>
		<Navbar />
		<main class="dashboard">
			<LotSidebar class='sidebar'/>
			<LotView class='view' />
		</main>
	</div>
</template>

<script>

import LotSidebar from '@/components/LotSidebar'
import LotView from '@/components/LotView'
import Navbar from '@/components/Navbar'

export default {
	components: {
		LotSidebar,
		LotView,
		Navbar
	}
}
</script>

<style lang="scss" scoped>
h1 {
	color: #333;
	margin: 0px 35px;
	margin-top: 20px;
}

main.dashboard {
	display: grid;
	grid-template-columns: 1fr 3fr;
}
</style>