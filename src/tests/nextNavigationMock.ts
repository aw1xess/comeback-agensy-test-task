export const useParams = jest.fn(() => ({ id: "50.45-30.52" }));
export const useRouter = jest.fn(() => ({
  push: jest.fn(),
  refresh: jest.fn(),
}));
