import { BrandClient } from "@/helpers/brands";
import { getToken } from "./utils/get-token";
import dotenv from 'dotenv';

dotenv.config();

const storeId = "cmal891ox0000dz016c12tn3y"
const brandName = "HWEI Test Brand"
const brandDescription = "This is a test brand"
const brandImage = "https://images.pexels.com/photos/41162/moon-landing-apollo-11-nasa-buzz-aldrin-41162.jpeg"
let brandId: string;

describe("BrandClient CRUD Test", () => {
  test("Get all brands", async () => {
    const myBrand = new BrandClient(getToken, storeId)
    const result = await myBrand.getAllBrands();

    expect(result).toEqual(expect.arrayContaining([
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        description: expect.any(String),
        storeId: expect.any(String),
      })
    ]))
  })

  test("Create a new brand", async () => {
    const myBrand = new BrandClient(getToken, storeId)
    const result = await myBrand.createBrand({
      name: brandName,
      description: brandDescription,
      image: brandImage
    })

    brandId = result.id;

    expect(result).toEqual(expect.objectContaining({
      id: expect.any(String),
      name: brandName,
      description: brandDescription,
      image: brandImage,
      storeId: storeId
    }))
  })

  test("Get a brand by ID", async () => {
    const myBrand = new BrandClient(getToken, storeId)
    const result = await myBrand.getBrand(brandId)

    expect(result).toEqual(expect.objectContaining({
      id: brandId,
      name: brandName,
      description: brandDescription,
      image: brandImage,
      storeId: storeId
    }))
  })

  test("Update a brand", async () => {
    const myBrand = new BrandClient(getToken, storeId)
    const result = await myBrand.updateBrand(brandId, {
      name: "New Brand Name",
      description: "New Brand Description",
      image: "https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg"
    })

    expect(result).toEqual(expect.objectContaining({
      id: brandId,
      name: "New Brand Name",
      description: "New Brand Description",
      image: "https://images.pexels.com/photos/73910/mars-mars-rover-space-travel-robot-73910.jpeg",
      storeId: storeId
    }))
  })

  test("Delete a brand", async () => {
    const myBrand = new BrandClient(getToken, storeId)
    const result = await myBrand.deleteBrand(brandId)
    expect(result).toBe(true)
  })
})
