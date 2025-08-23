import SmurfResponse, { SmurfAction } from "@core/response";
import { HTTP_METHODS } from "@utilities/constants";
import { CategoryPolicy } from './category.policy';

@SmurfAction({
  action: '/category',
  message: 'Category fetched successfully',
  policies: [CategoryPolicy]
})
export class CategoryApi extends SmurfResponse {

  async run() {
    this.result = 'index api for Category';
  }
}

@SmurfAction({
  action: '/category/:id',
  message: 'Category fetched successfully',
})
export class CategoryGetByIdApi extends SmurfResponse {

  async run() {

    this.result = 'index api for Category';
  }
}

@SmurfAction({
  action: '/category/:id',
  message: 'Category updated successfully',
  method: HTTP_METHODS.PUT
})
export class CategoryUpdateIdApi extends SmurfResponse {

  async run() {

    this.result = 'index api for Category';
  }
}