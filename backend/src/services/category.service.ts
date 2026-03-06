import { prismaClient } from "../../prisma/prisma";
import {
  CreateCategoryInput,
  UpdateCategoryInput,
} from "../dtos/input/category.input";

export class CategoryService {
  async createCategory(data: CreateCategoryInput, userId: string) {
    return prismaClient.category.create({
      data: {
        title: data.title,
        description: data.description,
        color: data.color,
        icon: data.icon,
        userId,
      },
    });
  }

  async updateCategory(id: string, data: UpdateCategoryInput) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new Error("Categoria não encontrada");

    return prismaClient.category.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description,
        color: data.color,
        icon: data.icon,
      },
    });
  }

  async deleteCategory(id: string) {
    const findCategory = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });
    if (!findCategory) throw new Error("Categoria não encontrada");
    return prismaClient.category.delete({
      where: {
        id,
      },
    });
  }

  async listCategories() {
    return prismaClient.category.findMany();
  }

  async getCategory(id: string) {
    const category = await prismaClient.category.findUnique({
      where: {
        id,
      },
    });

    if (!category) throw new Error("Categoria não encontrada");

    return category;
  }
}
