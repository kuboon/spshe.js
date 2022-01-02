import { test } from "./mod.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test({
	name: "RowNum",
	fn: () => {
		const { RowNum } = test;
		const { encode, decode } = RowNum;
		assertEquals(encode(0), "A");
		assertEquals(encode(25), "Z");
		assertEquals(encode(26), "AA");
		assertEquals(encode(27), "AB");
		assertEquals(decode("AB"), 27);
		assertEquals(decode(encode(100)), 100);
	}
})
