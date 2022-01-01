import { SpsheDoc } from "../types.ts";
import { calculate } from "./mod.ts";
import { assertEquals } from "https://deno.land/std@0.119.0/testing/asserts.ts";
await Deno.test({
	name: 'calculate',
	async fn() {
		const doc: SpsheDoc = {
			A1: {
				type: 'formula',
				value: 'A2+A3',
			},
			A2: {
				type: 'formula',
				value: 'A3',
			},
			A3: 4
		}
		const result = await calculate(doc)
		assertEquals(result.A1, 8)
	}
})