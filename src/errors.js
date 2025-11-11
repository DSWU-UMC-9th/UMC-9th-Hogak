export class DuplicateUserEmailError extends Error {
  errorCode = "U001";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class RegionIdMissingError extends Error {
  errorCode = "U002";

  constructor(reason) {
    super(reason);
    this.reason = reason;
  }
}

export class StoreNameMissingError extends Error {
  errorCode = "U003";

  constructor(reason) {
    super(reason);
    this.reason = reason;
  }
}

export class ReviewMissingError extends Error {
  errorCode = "U004";

  constructor(reason) {
    super(reason);
    this.reason = reason;
  }
}

export class MissionMissingError extends Error {
  errorCode = "U005";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}

export class StoreMismatchError extends Error {
  errorCode = "U006";

  constructor(reason, reqStoreId, storeId) {
    super(reason);
    this.reason = reason;
    this.reqStoreId = reqStoreId;
    this.storeId = storeId;
  }
}

export class MissionChallengingError extends Error {
  errorCode = "U005";

  constructor(reason, data) {
    super(reason);
    this.reason = reason;
    this.data = data;
  }
}