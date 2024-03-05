export type bankAccountType = {
  id: number;
  bankName: string;
  type: string;
  bankCode: string;
  branchName: string;
  branchCode: string;
  accTitle: string;
  accNo: string;
  status: boolean;
  effectiveDate: string;
  createdAt: string;
  updatedAt: string;
  userId: number;
};

export type fetchAllBankAccountsApiResponse = {
  message: string;
  data: BankAccount[];
  page: string;
  limit: string;
  total: number;
  lastPage: number;
};
