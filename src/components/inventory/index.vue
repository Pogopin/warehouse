<template>
	<div class="inventary">
		<div class="inventary__leftbar">
			<div class="inventary__leftbar-img">
        <img src="@/assets/images/sunduk640.png" alt="">
      </div>
      <div class="inventary__leftbar-body">
				<p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Porro deleniti veniam cumque molestias consequuntur iusto adipisci esse velit, voluptatum dignissimos ad minus repudiandae impedit suscipit ratione eveniet. Excepturi, doloremque laboriosam.
				</p>
      </div>
		</div>
		<div class="inventary__content">
			<Grid/>
		</div>

		<div class="inventary__footer">
      <div class="inventary__footer-body">
        <div class="inventary__footer-content">wareHouse</div>
      </div>
    </div>
	</div>

</template>
<script setup>
import { Grid } from '@/components';

</script>
<style scoped>
.inventary {
  display: grid;
  grid-template-columns: 236px 1fr;
  grid-template-rows: 1fr 72px;
  gap: 20px 20px;
  grid-template-areas:
    "leftbar content"
    "footer footer";
}
.inventary__content { grid-area: content; }
.inventary__leftbar { grid-area: leftbar; }
.inventary__footer { grid-area: footer; }

.inventary__leftbar {
	background-color: #2D2D2D;
	border-radius: 12px;
	padding-left: 14px;
	padding-right: 14px;
	padding-top: 18px;
}
.inventary__leftbar-body {
	max-width: 236px;
}
.inventary__leftbar-body p {
  color: white;
}
.inventary__footer {
  padding-right: 12px;
}
.inventary__footer-body {
  background-color: #2D2D2D;
  border: 1px solid #4D4D4D;
  border-radius: 12px;
  padding: 18px;
  width: 795px;
}
.inventary__footer-content {
  width: 700px;
  height: 36px;
  background-color: #3C3C3C;
  border-radius: 12px;
  color: white;
  text-align: center;
  display: table-cell;
  vertical-align: middle;
}
.inventary__leftbar-img {
  max-width: 350px;
  width: 205px;
}
.inventary__leftbar-img img {
  width: 100%;
}

</style>
