import { StoreClient } from "@/store";
import { getToken } from "./utils/get-token";
import dotenv from 'dotenv';
import { Store } from "@hwei/schema/dto/store.schema";

dotenv.config();

const myStore = new StoreClient(getToken)

const name = "My Test Store";
let storeId = "";

describe("StoreClient CRUD Test", () => {
  test("Create a new store", async () => {
    const result = await myStore.createStore({
      name: name,
      version: 1,
      icon: "Store"
    })

    expect(result).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: name,
      slug: expect.any(String),
      icon: "Store",
      isActive: true,
      version: 1,
      userId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      deletedAt: null
    }))

    storeId = result.id;
  })

  test("Get a store by ID", async () => {
    const result = await myStore.getStore(storeId);
    expect(result).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: name,
      slug: expect.any(String),
      icon: "Store",
      isActive: true,
      version: 1,
      userId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      deletedAt: null
    }))
  })

  test("Get all stores", async () => {
    const result: Store[] = await myStore.getAllStores();

    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        slug: expect.any(String),
        icon: expect.any(String),
        isActive: expect.any(Boolean),
        version: expect.any(Number),
        userId: expect.any(String),
        createdAt: expect.any(String),
        updatedAt: expect.any(String),
        deletedAt: null
      })
    ]));
  });


  // test("Update store name and Icon", async () => {
  //   const result = await myStore.updateStore(storeId, {
  //     name: "New Store Name",
  //     icon: "Home"
  //   })
  //   expect(result).toEqual(expect.objectContaining({
  //     id: expect.any(String),
  //     name: "New Store Name",
  //     slug: expect.any(String),
  //     icon: "Home",
  //     isActive: true,
  //     version: 1,
  //     userId: expect.any(String),
  //     createdAt: expect.any(String),
  //     updatedAt: expect.any(String),
  //     deletedAt: null
  //   }))
  // })

  test("Delete a store", async () => {
    const result = await myStore.deleteStore(storeId);
    expect(result).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: name,
      slug: expect.any(String),
      icon: expect.any(String),
      isActive: false,
      version: expect.any(Number),
      userId: expect.any(String),
      createdAt: expect.any(String),
      updatedAt: expect.any(String),
      deletedAt: expect.any(String)
    }))
  })
})
