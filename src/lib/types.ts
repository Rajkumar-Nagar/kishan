import { getProducts } from "@/actions/product.actions";

export type ProductType = Awaited<ReturnType<typeof getProducts>>[0];
