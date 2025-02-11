const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const { sendResponse } = require('../../../utils/responseHandler');
const Services = require('../services');

const deleteCoupon = catchAsync(async (req, res) => {

  const { id } = await pick(req.params, ['id']);
  const removed = await Services.deleteCoupons(id)
  if (removed.status) {
    sendResponse(res, httpStatus.OK, removed.data, null);
  } else {
    if(removed.code == 400){
      sendResponse(res,httpStatus.BAD_REQUEST,null,removed)
    }else if(removed.code==500){
      sendResponse(res,httpStatus.INTERNAL_SERVER_ERROR,null,removed.data)
    }else{
    sendResponse(res, httpStatus.BAD_REQUEST, null, removed);
  }
}
});

module.exports = deleteCoupon
