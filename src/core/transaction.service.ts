export default abstract class TransactionService {
  abstract run(body: any, ...param: any): any;
}