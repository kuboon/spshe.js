import { SpsheDoc } from "../spshe/types.ts";
import { calculate } from "./mod.ts";
import { assertEquals } from "../test_deps.ts";
Deno.test({
	name: 'simple calculate',
	async fn() {
		const doc: SpsheDoc = {
			A1: {
				type: 'formula',
				value: 'A2+A3*2',
			},
			A2: {
				type: 'formula',
				value: 'A3',
			},
			A3: 4
		}
		const result = await calculate(doc)
		assertEquals(result.A1, 12)
	}
})

Deno.test({
	name: 'calculate lambda',
	async fn() {
		const doc: SpsheDoc = {
			A1: {
				type: 'formula',
				value: 'A2(A3)',
			},
			A2: {
				type: 'formula',
				value: 'x=>x**2',
			},
			A3: {
				type: 'formula',
				value: 'Math.PI',
			}
		}
		const result = await calculate(doc)
		assertEquals(result.A1, Math.PI ** 2)
	}
})

Deno.test({
	name: 'calculate max',
	async fn() {
		const doc: SpsheDoc = {
			A1: {
				type: 'formula',
				value: 'Math.max(...A2:A3)',
			},
			A2: {
				type: 'formula',
				value: 'A3+1'
			},
			A3: 4
		}
		const result = await calculate(doc)
		assertEquals(result.A1, 5)
	}
})
Deno.test({
	name: 'calculate sum of rows',
	async fn() {
		const doc: SpsheDoc = {
			A1: {
				type: 'formula',
				value: 'sum(...2:3)',
			},
			A2: {
				type: 'formula',
				value: 'A3+1'
			},
			A3: 4
		}
		const result = await calculate(doc)
		assertEquals(result.A1, 5)
	}
})
