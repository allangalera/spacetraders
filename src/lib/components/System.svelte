<script lang="ts">
	import type { generateSpaceTradersApi } from '$lib/spacetraders';
	import type { Agent } from '$lib/spacetraders/types/agents';
	import type { System } from '$lib/spacetraders/types/system';
	import { apiStore } from '$lib/stores/agent';
	import { onMount } from 'svelte';

	let spaceTraderApi: ReturnType<typeof generateSpaceTradersApi> | null;
	let userAgent: Agent | null;
	let system: System;
	let isMouseDown = false;
	let mouseDownPosition: { x: number; y: number; translateX: number; translateY: number };
	const RING_INTERVAL = 100;
	const rings = Array.from({ length: 8 }).map((v, i) => (i + 1) * RING_INTERVAL);
	const ZOOM = {
		MIN: 1,
		MAX: 18,
	};
	const TRANSLATE = {
		X_MAX: 200,
		Y_MAX: 200,
	};
	const COLORS = {
		PLANET: 'green',
		GAS_GIANT: 'white',
		MOON: 'white',
		ORBITAL_STATION: 'white',
		JUMP_GATE: 'white',
		ASTEROID_FIELD: 'white',
		ASTEROID: 'white',
		ENGINEERED_ASTEROID: 'white',
		ASTEROID_BASE: 'white',
		NEBULA: 'white',
		DEBRIS_FIELD: 'white',
		GRAVITY_WELL: 'white',
		ARTIFICIAL_GRAVITY_WELL: 'white',
		FUEL_STATION: 'white',
	} as const;
	let scale = ZOOM.MIN;
	let translateX = 0;
	let translateY = 0;

	apiStore.subscribe((api) => {
		if (!api) return;

		spaceTraderApi = api;
	});

	function zoomIn() {
		scale = Math.min(ZOOM.MAX, scale + 1);
	}

	function zoomOut() {
		scale = Math.max(ZOOM.MIN, scale - 1);
	}

	function reset() {
		translateX = 0;
		translateY = 0;
		scale = ZOOM.MIN;
	}

	function limitNumberWithinRange({ num, min, max }: { num: number; min: number; max: number }) {
		return Math.min(Math.max(num, min), max);
	}

	function setTranslateX(amount: number) {
		translateX = limitNumberWithinRange({ num: amount, min: -200, max: 200 });
	}
	function setTranslateY(amount: number) {
		translateY = limitNumberWithinRange({ num: amount, min: -200, max: 200 });
	}

	async function getAgentDetails(api: ReturnType<typeof generateSpaceTradersApi>) {
		const response = await api.agent.getDetails();
		userAgent = response.data;
	}

	async function getSystem(api: ReturnType<typeof generateSpaceTradersApi>, agent: Agent) {
		let symbol = agent.headquarters.split('-').slice(0, 2).join('-');
		const response = await api.system.get(symbol);
		system = response.data;
	}

	$: {
		if (spaceTraderApi) {
			getAgentDetails(spaceTraderApi);
		}
	}
	$: {
		if (spaceTraderApi && userAgent) {
			getSystem(spaceTraderApi, userAgent);
		}
	}

	onMount(() => {
		function wheelEventFn(e: WheelEvent) {
			if (e.deltaY > 0) {
				zoomOut();
			} else {
				zoomIn();
			}
		}
		window.addEventListener('wheel', wheelEventFn);

		function keyupEventFn(e: KeyboardEvent) {
			if (e.code === 'ArrowRight') {
				setTranslateX(translateX - 10);
			}
			if (e.code === 'ArrowLeft') {
				setTranslateX(translateX + 10);
			}
		}
		window.addEventListener('keyup', keyupEventFn);

		function mousedownEventFn(e: MouseEvent) {
			isMouseDown = true;
			mouseDownPosition = {
				x: e.clientX,
				y: e.clientY,
				translateX,
				translateY,
			};
		}
		window.addEventListener('mousedown', mousedownEventFn);

		function mouseupEventFn(e: MouseEvent) {
			isMouseDown = false;
		}
		window.addEventListener('mouseup', mouseupEventFn);

		function mousemoveEventFn(e: MouseEvent) {
			if (isMouseDown) {
				setTranslateX(mouseDownPosition.translateX - (mouseDownPosition.x - e.clientX));
				setTranslateY(mouseDownPosition.translateY - (mouseDownPosition.y - e.clientY));
			}
		}
		window.addEventListener('mousemove', mousemoveEventFn);

		return () => {
			window.removeEventListener('wheel', wheelEventFn);
			window.removeEventListener('keyup', keyupEventFn);
			window.removeEventListener('mousedown', mousedownEventFn);
			window.removeEventListener('mouseup', mouseupEventFn);
			window.removeEventListener('mousemove', mousemoveEventFn);
		};
	});
</script>

<div class="system-wrapper">
	<div class="system" style="transform: translate({translateX}px, {translateY}px) scale({scale});">
		<svg viewBox="-800 -800 1600 1600">
			<g>
				{#each rings as ring}
					<g>
						<circle
							cx="0"
							cy="0"
							r={ring}
							fill="none"
							stroke="teal"
							vector-effect="non-scaling-stroke"
							stroke-width="0.1"
							opacity="0.6"
						/>
					</g>
				{/each}
				{#if system}
					{#each system.waypoints as wp}
						{#if wp.type !== 'ORBITAL_STATION' && wp.type !== 'MOON'}
							<g>
								<circle
									cx={wp.x}
									cy={wp.y}
									r="1"
									fill="white"
									style="cursor: pointer;"
									class="test"
								/>
								<text
									vector-effect="non-scaling-stroke"
									x={wp.x + 2}
									y={wp.y - 0.5}
									text-anchor="left"
									dominant-baseline="central"
									fill="white"
									font-size="1.5"
									style="user-select: none; cursor: pointer;">{wp.type}</text
								>
								<text
									vector-effect="non-scaling-stroke"
									x={wp.x + 2}
									y={wp.y + 1.5 - 0.5}
									text-anchor="left"
									dominant-baseline="central"
									fill="white"
									font-size="1"
									style="user-select: none; cursor: pointer;">{wp.symbol.split('-')[2]}</text
								>
								{#each wp.orbitals as orbital, i}
									<circle
										cx={wp.x - i * 1}
										cy={wp.y + 2}
										r="0.5"
										fill="white"
										stroke="#182134"
										stroke-width="0.25"
									/>
									<text
										vector-effect="non-scaling-stroke"
										x={wp.x + 2 + (i + 1) * 2}
										y={wp.y + 1.5 - 0.5}
										text-anchor="left"
										dominant-baseline="central"
										fill="white"
										font-size="1"
										style="user-select: none; cursor: pointer;">{orbital.symbol.split('-')[2]}</text
									>
								{/each}
							</g>
							<g>
								<circle
									cx="0"
									cy="0"
									r={Math.hypot(wp.x, wp.y)}
									fill="none"
									stroke="teal"
									stroke-width="0.1"
									vector-effect="non-scaling-stroke"
									opacity="0.1"
								/>
							</g>
						{/if}
					{/each}
				{/if}
				<g>
					<circle cx="0" cy="0" r="1" fill="yellow" style="cursor: pointer;" class="test" />
					{#if system}
						<text
							vector-effect="non-scaling-stroke"
							x="5"
							text-anchor="middle"
							dominant-baseline="central"
							fill="white"
							font-size="1.5"
							style="user-select: none; cursor: pointer;">{system.symbol}</text
						>
					{/if}
				</g>
			</g>
		</svg>
	</div>
	<div class="controls">
		<button on:click={zoomIn}>zoom in</button>
		<button on:click={zoomOut}>zoom out</button>
		<button on:click={reset}>reset</button>
	</div>
</div>

<style>
	.system-wrapper {
		width: 100vw;
		height: 100vh;
		position: absolute;
		top: 0;
		left: 0;
	}
	.system {
		width: 100%;
		height: 100%;
		position: absolute;
		top: 0;
		left: 0;
	}

	svg {
		width: 100vw;
		height: 100vh;
	}

	.controls {
		display: flex;
		position: absolute;
		left: 0;
		bottom: 0;
		padding: 1rem;
		gap: 1rem;
	}

	button {
		border: 1px solid white;
		padding-inline: 0.6rem;
		padding-block: 0.2rem;
	}

	.test:hover {
		outline: 1px solid red;
	}
</style>
