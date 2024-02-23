<script lang="ts">
	export let token: string;

	const getMaskedToken = (str: string) => {
		return `${token.slice(0, 3)}${Array(15).fill('•').join('')}${token.slice(-3)}`;
	};

	$: maskedToken = getMaskedToken(token);
</script>

{maskedToken}
