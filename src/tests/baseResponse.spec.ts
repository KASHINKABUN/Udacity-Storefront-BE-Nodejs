import { BaseResponse } from '../common';

it('should return correct response', () => {
  expect(BaseResponse({ data: {}, message: null })).toEqual({
    message: null,
    data: {},
  });
  expect(BaseResponse({ data: { test: 'test' }, message: null })).toEqual({
    data: { test: 'test' },
    message: null,
  });
});
