const _getLimit = request => {
  let _limit = parseInt(request.query.limit);
  return (isNaN(_limit) || _limit < 0) ? 0 : _limit;
};

const _getOffset = request => {
  let _offset = parseInt(request.query.offset);
  return (isNaN(_offset) || _offset < 0) ? 0 : _offset;
};

module.exports = {
  extend: request => {
    request.__proto__.limit = function() {
      return _getLimit(this);
    };

    request.__proto__.offset = function() {
      return _getOffset(this);
    };
  }
};
