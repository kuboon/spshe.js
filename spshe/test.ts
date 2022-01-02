import { test } from "./mod.ts";
import { assertEquals } from "../test_deps.ts";

Deno.test({
	name: "RowNum",
	fn: () => {
		const { ColNum} = test;
		const { encode, decode } = ColNum;
		assertEquals(decode("AB"), 28);
		assertEquals(decode("AAA"), 26**2 + 26 + 1);
		assertEquals(encode(1), "A");
		assertEquals(encode(26), "Z");
		assertEquals(encode(27), "AA");
		assertEquals(encode(28), "AB");
		assertEquals(encode(decode("AZ") + 1), 'BA');
		assertEquals(encode(decode("ZZ") + 1), 'AAA');
		assertEquals(decode(encode(27**3)), 27**3);
	}
})
