<script lang="ts">
	import { onMount } from 'svelte';

	let canvas: HTMLCanvasElement | null;
	let context: CanvasRenderingContext2D | null;
	let documentWidth: number;
	let documentHeight: number;

	const NUMBER_OF_STARS = {
		SMALL: 2000,
		MEDIUM: 200,
		BIG: 20,
	};

	function randomIntFromInterval(min: number, max: number) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}
	function randomFloatFromInterval(min: number, max: number) {
		return Math.random() * (max - min) + min;
	}

	onMount(() => {
		documentWidth = document.body.clientWidth - 16;
		documentHeight = document.body.clientHeight - 16;
		if (!canvas) return;
		canvas.width = documentWidth;
		canvas.height = documentHeight;
		context = canvas.getContext('2d');
		if (context) {
			context.imageSmoothingEnabled = false;
			context.fillStyle = '#020617';
			context.fillRect(0, 0, documentWidth, documentHeight);
			for (const star of Array.from({ length: NUMBER_OF_STARS.SMALL })) {
				drawStar({
					ctx: context,
					x: randomIntFromInterval(0, documentWidth),
					y: randomIntFromInterval(0, documentHeight),
					r: 0.3,
				});
			}
			// for (const star of Array.from({ length: NUMBER_OF_STARS.MEDIUM })) {
			// 	drawStar({
			// 		ctx: context,
			// 		x: randomIntFromInterval(0, documentWidth),
			// 		y: randomIntFromInterval(0, documentHeight),
			// 		r: randomFloatFromInterval(0.8, 1.5),
			// 	});
			// }
			// for (const star of Array.from({ length: NUMBER_OF_STARS.BIG })) {
			// 	drawStar({
			// 		ctx: context,
			// 		x: randomIntFromInterval(0, documentWidth),
			// 		y: randomIntFromInterval(0, documentHeight),
			// 		r: randomFloatFromInterval(2, 2.5),
			// 	});
			// }
		}
	});

	function drawStar({
		ctx,
		x,
		y,
		r,
	}: {
		ctx: CanvasRenderingContext2D;
		x: number;
		y: number;
		r: number;
	}) {
		ctx.shadowBlur = 10;
		ctx.shadowColor = 'white';

		//Draw the stars;
		ctx.beginPath();
		ctx.fillStyle = 'white';
		ctx.arc(x, y, r, 0, Math.PI * 2);
		ctx.fill();
	}
</script>

<canvas bind:this={canvas} />

<style>
	canvas {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
		z-index: -1;
	}
</style>
