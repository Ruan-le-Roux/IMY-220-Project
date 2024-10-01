"use strict";

function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
var _express = _interopRequireDefault(require("express"));
var _dotenv = _interopRequireDefault(require("dotenv"));
var _mongodb = require("mongodb");
function _interopRequireDefault(e) { return e && e.__esModule ? e : { "default": e }; }
function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _regeneratorRuntime() { "use strict"; /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/facebook/regenerator/blob/main/LICENSE */ _regeneratorRuntime = function _regeneratorRuntime() { return e; }; var t, e = {}, r = Object.prototype, n = r.hasOwnProperty, o = Object.defineProperty || function (t, e, r) { t[e] = r.value; }, i = "function" == typeof Symbol ? Symbol : {}, a = i.iterator || "@@iterator", c = i.asyncIterator || "@@asyncIterator", u = i.toStringTag || "@@toStringTag"; function define(t, e, r) { return Object.defineProperty(t, e, { value: r, enumerable: !0, configurable: !0, writable: !0 }), t[e]; } try { define({}, ""); } catch (t) { define = function define(t, e, r) { return t[e] = r; }; } function wrap(t, e, r, n) { var i = e && e.prototype instanceof Generator ? e : Generator, a = Object.create(i.prototype), c = new Context(n || []); return o(a, "_invoke", { value: makeInvokeMethod(t, r, c) }), a; } function tryCatch(t, e, r) { try { return { type: "normal", arg: t.call(e, r) }; } catch (t) { return { type: "throw", arg: t }; } } e.wrap = wrap; var h = "suspendedStart", l = "suspendedYield", f = "executing", s = "completed", y = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} var p = {}; define(p, a, function () { return this; }); var d = Object.getPrototypeOf, v = d && d(d(values([]))); v && v !== r && n.call(v, a) && (p = v); var g = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(p); function defineIteratorMethods(t) { ["next", "throw", "return"].forEach(function (e) { define(t, e, function (t) { return this._invoke(e, t); }); }); } function AsyncIterator(t, e) { function invoke(r, o, i, a) { var c = tryCatch(t[r], t, o); if ("throw" !== c.type) { var u = c.arg, h = u.value; return h && "object" == _typeof(h) && n.call(h, "__await") ? e.resolve(h.__await).then(function (t) { invoke("next", t, i, a); }, function (t) { invoke("throw", t, i, a); }) : e.resolve(h).then(function (t) { u.value = t, i(u); }, function (t) { return invoke("throw", t, i, a); }); } a(c.arg); } var r; o(this, "_invoke", { value: function value(t, n) { function callInvokeWithMethodAndArg() { return new e(function (e, r) { invoke(t, n, e, r); }); } return r = r ? r.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg(); } }); } function makeInvokeMethod(e, r, n) { var o = h; return function (i, a) { if (o === f) throw Error("Generator is already running"); if (o === s) { if ("throw" === i) throw a; return { value: t, done: !0 }; } for (n.method = i, n.arg = a;;) { var c = n.delegate; if (c) { var u = maybeInvokeDelegate(c, n); if (u) { if (u === y) continue; return u; } } if ("next" === n.method) n.sent = n._sent = n.arg;else if ("throw" === n.method) { if (o === h) throw o = s, n.arg; n.dispatchException(n.arg); } else "return" === n.method && n.abrupt("return", n.arg); o = f; var p = tryCatch(e, r, n); if ("normal" === p.type) { if (o = n.done ? s : l, p.arg === y) continue; return { value: p.arg, done: n.done }; } "throw" === p.type && (o = s, n.method = "throw", n.arg = p.arg); } }; } function maybeInvokeDelegate(e, r) { var n = r.method, o = e.iterator[n]; if (o === t) return r.delegate = null, "throw" === n && e.iterator["return"] && (r.method = "return", r.arg = t, maybeInvokeDelegate(e, r), "throw" === r.method) || "return" !== n && (r.method = "throw", r.arg = new TypeError("The iterator does not provide a '" + n + "' method")), y; var i = tryCatch(o, e.iterator, r.arg); if ("throw" === i.type) return r.method = "throw", r.arg = i.arg, r.delegate = null, y; var a = i.arg; return a ? a.done ? (r[e.resultName] = a.value, r.next = e.nextLoc, "return" !== r.method && (r.method = "next", r.arg = t), r.delegate = null, y) : a : (r.method = "throw", r.arg = new TypeError("iterator result is not an object"), r.delegate = null, y); } function pushTryEntry(t) { var e = { tryLoc: t[0] }; 1 in t && (e.catchLoc = t[1]), 2 in t && (e.finallyLoc = t[2], e.afterLoc = t[3]), this.tryEntries.push(e); } function resetTryEntry(t) { var e = t.completion || {}; e.type = "normal", delete e.arg, t.completion = e; } function Context(t) { this.tryEntries = [{ tryLoc: "root" }], t.forEach(pushTryEntry, this), this.reset(!0); } function values(e) { if (e || "" === e) { var r = e[a]; if (r) return r.call(e); if ("function" == typeof e.next) return e; if (!isNaN(e.length)) { var o = -1, i = function next() { for (; ++o < e.length;) if (n.call(e, o)) return next.value = e[o], next.done = !1, next; return next.value = t, next.done = !0, next; }; return i.next = i; } } throw new TypeError(_typeof(e) + " is not iterable"); } return GeneratorFunction.prototype = GeneratorFunctionPrototype, o(g, "constructor", { value: GeneratorFunctionPrototype, configurable: !0 }), o(GeneratorFunctionPrototype, "constructor", { value: GeneratorFunction, configurable: !0 }), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, u, "GeneratorFunction"), e.isGeneratorFunction = function (t) { var e = "function" == typeof t && t.constructor; return !!e && (e === GeneratorFunction || "GeneratorFunction" === (e.displayName || e.name)); }, e.mark = function (t) { return Object.setPrototypeOf ? Object.setPrototypeOf(t, GeneratorFunctionPrototype) : (t.__proto__ = GeneratorFunctionPrototype, define(t, u, "GeneratorFunction")), t.prototype = Object.create(g), t; }, e.awrap = function (t) { return { __await: t }; }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, c, function () { return this; }), e.AsyncIterator = AsyncIterator, e.async = function (t, r, n, o, i) { void 0 === i && (i = Promise); var a = new AsyncIterator(wrap(t, r, n, o), i); return e.isGeneratorFunction(r) ? a : a.next().then(function (t) { return t.done ? t.value : a.next(); }); }, defineIteratorMethods(g), define(g, u, "Generator"), define(g, a, function () { return this; }), define(g, "toString", function () { return "[object Generator]"; }), e.keys = function (t) { var e = Object(t), r = []; for (var n in e) r.push(n); return r.reverse(), function next() { for (; r.length;) { var t = r.pop(); if (t in e) return next.value = t, next.done = !1, next; } return next.done = !0, next; }; }, e.values = values, Context.prototype = { constructor: Context, reset: function reset(e) { if (this.prev = 0, this.next = 0, this.sent = this._sent = t, this.done = !1, this.delegate = null, this.method = "next", this.arg = t, this.tryEntries.forEach(resetTryEntry), !e) for (var r in this) "t" === r.charAt(0) && n.call(this, r) && !isNaN(+r.slice(1)) && (this[r] = t); }, stop: function stop() { this.done = !0; var t = this.tryEntries[0].completion; if ("throw" === t.type) throw t.arg; return this.rval; }, dispatchException: function dispatchException(e) { if (this.done) throw e; var r = this; function handle(n, o) { return a.type = "throw", a.arg = e, r.next = n, o && (r.method = "next", r.arg = t), !!o; } for (var o = this.tryEntries.length - 1; o >= 0; --o) { var i = this.tryEntries[o], a = i.completion; if ("root" === i.tryLoc) return handle("end"); if (i.tryLoc <= this.prev) { var c = n.call(i, "catchLoc"), u = n.call(i, "finallyLoc"); if (c && u) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } else if (c) { if (this.prev < i.catchLoc) return handle(i.catchLoc, !0); } else { if (!u) throw Error("try statement without catch or finally"); if (this.prev < i.finallyLoc) return handle(i.finallyLoc); } } } }, abrupt: function abrupt(t, e) { for (var r = this.tryEntries.length - 1; r >= 0; --r) { var o = this.tryEntries[r]; if (o.tryLoc <= this.prev && n.call(o, "finallyLoc") && this.prev < o.finallyLoc) { var i = o; break; } } i && ("break" === t || "continue" === t) && i.tryLoc <= e && e <= i.finallyLoc && (i = null); var a = i ? i.completion : {}; return a.type = t, a.arg = e, i ? (this.method = "next", this.next = i.finallyLoc, y) : this.complete(a); }, complete: function complete(t, e) { if ("throw" === t.type) throw t.arg; return "break" === t.type || "continue" === t.type ? this.next = t.arg : "return" === t.type ? (this.rval = this.arg = t.arg, this.method = "return", this.next = "end") : "normal" === t.type && e && (this.next = e), y; }, finish: function finish(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.finallyLoc === t) return this.complete(r.completion, r.afterLoc), resetTryEntry(r), y; } }, "catch": function _catch(t) { for (var e = this.tryEntries.length - 1; e >= 0; --e) { var r = this.tryEntries[e]; if (r.tryLoc === t) { var n = r.completion; if ("throw" === n.type) { var o = n.arg; resetTryEntry(r); } return o; } } throw Error("illegal catch attempt"); }, delegateYield: function delegateYield(e, r, n) { return this.delegate = { iterator: values(e), resultName: r, nextLoc: n }, "next" === this.method && (this.arg = t), y; } }, e; }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
_dotenv["default"].config();

// const port = process.env.PORT || 3005;
var port = process.env.PORT || 3000;

// const port = process.env.PORT || 3005;

// const port =  3001;

//create app
var app = (0, _express["default"])();

//serve static page into public directory
app.use(_express["default"]["static"]("frontend/public"));
app.use(_express["default"].json());
var client = new _mongodb.MongoClient(process.env.MONGO_URI);
var db;
function connectDatabase() {
  return _connectDatabase.apply(this, arguments);
}
function _connectDatabase() {
  _connectDatabase = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee7() {
    return _regeneratorRuntime().wrap(function _callee7$(_context7) {
      while (1) switch (_context7.prev = _context7.next) {
        case 0:
          _context7.prev = 0;
          _context7.next = 3;
          return client.connect();
        case 3:
          db = client.db("SoundSync");
          console.log("Connected to MongoDB");
          _context7.next = 10;
          break;
        case 7:
          _context7.prev = 7;
          _context7.t0 = _context7["catch"](0);
          console.error("Failed to connect to MongoDB", _context7.t0);
        case 10:
        case "end":
          return _context7.stop();
      }
    }, _callee7, null, [[0, 7]]);
  }));
  return _connectDatabase.apply(this, arguments);
}
connectDatabase();
app.listen(port, function () {
  console.log("Listening on port: localhost:".concat(port));
});

//functions
//generate user id
function generateId() {
  return _generateId.apply(this, arguments);
}
function _generateId() {
  _generateId = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee8() {
    var users, maxId;
    return _regeneratorRuntime().wrap(function _callee8$(_context8) {
      while (1) switch (_context8.prev = _context8.next) {
        case 0:
          _context8.next = 2;
          return db.collection("users").find({}).toArray();
        case 2:
          users = _context8.sent;
          if (!(users.length === 0)) {
            _context8.next = 5;
            break;
          }
          return _context8.abrupt("return", 1);
        case 5:
          maxId = Math.max.apply(Math, _toConsumableArray(users.map(function (user) {
            return user.id;
          })));
          return _context8.abrupt("return", maxId + 1);
        case 7:
        case "end":
          return _context8.stop();
      }
    }, _callee8);
  }));
  return _generateId.apply(this, arguments);
}
function existingUser(_x, _x2) {
  return _existingUser.apply(this, arguments);
} //endpoints
//users
//get all users
function _existingUser() {
  _existingUser = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee9(flag, delimiter) {
    var _existingUser3, _existingUser4;
    return _regeneratorRuntime().wrap(function _callee9$(_context9) {
      while (1) switch (_context9.prev = _context9.next) {
        case 0:
          if (!(flag === true)) {
            _context9.next = 9;
            break;
          }
          _context9.next = 3;
          return db.collection("users").findOne({
            email: delimiter
          });
        case 3:
          _existingUser3 = _context9.sent;
          if (!_existingUser3) {
            _context9.next = 6;
            break;
          }
          return _context9.abrupt("return", true);
        case 6:
          return _context9.abrupt("return", false);
        case 9:
          _context9.next = 11;
          return db.collection("users").findOne({
            id: parseInt(delimiter)
          });
        case 11:
          _existingUser4 = _context9.sent;
          if (!_existingUser4) {
            _context9.next = 14;
            break;
          }
          return _context9.abrupt("return", true);
        case 14:
          return _context9.abrupt("return", false);
        case 15:
        case "end":
          return _context9.stop();
      }
    }, _callee9);
  }));
  return _existingUser.apply(this, arguments);
}
app.get("/api/users", /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee(req, res) {
    var users;
    return _regeneratorRuntime().wrap(function _callee$(_context) {
      while (1) switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return db.collection("users").find({}).toArray();
        case 3:
          users = _context.sent;
          res.status(200).json({
            status: "success",
            users: users
          });
          _context.next = 11;
          break;
        case 7:
          _context.prev = 7;
          _context.t0 = _context["catch"](0);
          console.error("Error getting users: ", _context.t0);
          res.status(500).json({
            status: "failed",
            message: "Could not get all users"
          });
        case 11:
        case "end":
          return _context.stop();
      }
    }, _callee, null, [[0, 7]]);
  }));
  return function (_x3, _x4) {
    return _ref.apply(this, arguments);
  };
}());

//add new user
app.post("/api/users/add-user", /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee2(req, res) {
    var _req$body, name, surname, email, password, profilePicture, bio, instagram, facebook, tiktok, twitter, playlists, following, followers, _existingUser2, id, newUser, result;
    return _regeneratorRuntime().wrap(function _callee2$(_context2) {
      while (1) switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _req$body = req.body, name = _req$body.name, surname = _req$body.surname, email = _req$body.email, password = _req$body.password, profilePicture = _req$body.profilePicture, bio = _req$body.bio, instagram = _req$body.instagram, facebook = _req$body.facebook, tiktok = _req$body.tiktok, twitter = _req$body.twitter, playlists = _req$body.playlists, following = _req$body.following, followers = _req$body.followers; // const newUser = req.body;
          // console.log("req body: ", req.body.id);
          if (!(!name || !surname || !email || !password)) {
            _context2.next = 4;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            status: "failed",
            message: "name, surname, email and password are required"
          }));
        case 4:
          _context2.next = 6;
          return db.collection("users").findOne({
            email: email
          });
        case 6:
          _existingUser2 = _context2.sent;
          if (!_existingUser2) {
            _context2.next = 9;
            break;
          }
          return _context2.abrupt("return", res.status(400).json({
            status: "failed",
            message: "User with email ".concat(email, " already in use")
          }));
        case 9:
          _context2.next = 11;
          return generateId();
        case 11:
          id = _context2.sent;
          newUser = {
            id: id,
            name: name,
            surname: surname,
            email: email,
            password: password,
            profilePicture: profilePicture || null,
            bio: bio || null,
            instagram: instagram || null,
            facebook: facebook || null,
            tiktok: tiktok || null,
            twitter: twitter || null,
            playlists: playlists || null,
            following: following || null,
            followers: followers || null
          };
          _context2.next = 15;
          return db.collection("users").insertOne(newUser);
        case 15:
          result = _context2.sent;
          res.status(201).json({
            status: "success",
            message: "User created successfully",
            user: newUser
          });
          _context2.next = 23;
          break;
        case 19:
          _context2.prev = 19;
          _context2.t0 = _context2["catch"](0);
          console.error("Error while creating new user: ", _context2.t0);
          res.status(500).json({
            status: "failed",
            message: "Could not create new user"
          });
        case 23:
        case "end":
          return _context2.stop();
      }
    }, _callee2, null, [[0, 19]]);
  }));
  return function (_x5, _x6) {
    return _ref2.apply(this, arguments);
  };
}());

//delete a user
app["delete"]("/api/users/delete-user/:id", /*#__PURE__*/function () {
  var _ref3 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee3(req, res) {
    var id, exists, result;
    return _regeneratorRuntime().wrap(function _callee3$(_context3) {
      while (1) switch (_context3.prev = _context3.next) {
        case 0:
          id = req.params.id;
          _context3.prev = 1;
          _context3.next = 4;
          return existingUser(false, id);
        case 4:
          exists = _context3.sent;
          if (!(exists === false)) {
            _context3.next = 7;
            break;
          }
          return _context3.abrupt("return", res.status(404).json({
            status: "failed",
            message: "User with id ".concat(id, " does not exist")
          }));
        case 7:
          _context3.next = 9;
          return db.collection("users").deleteOne({
            id: parseInt(id)
          });
        case 9:
          result = _context3.sent;
          if (result.deletedCount === 1) {
            res.status(200).json({
              status: "success",
              message: "User with id ".concat(id, " deleted successfully")
            });
          } else {
            res.status(500).json({
              status: "failed",
              message: "Could not delete user with id ".concat(id)
            });
          }
          _context3.next = 17;
          break;
        case 13:
          _context3.prev = 13;
          _context3.t0 = _context3["catch"](1);
          console.error("Error when deleting user: ", _context3.t0);
          res.status(500).json({
            status: "failed",
            message: "Could not delete user"
          });
        case 17:
        case "end":
          return _context3.stop();
      }
    }, _callee3, null, [[1, 13]]);
  }));
  return function (_x7, _x8) {
    return _ref3.apply(this, arguments);
  };
}());

//update user
app.put("/api/users/update-user/:id", /*#__PURE__*/function () {
  var _ref4 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee4(req, res) {
    var id, _req$body2, name, surname, email, password, profilePicture, bio, instagram, facebook, tiktok, twitter, playlists, following, followers, exists, updated;
    return _regeneratorRuntime().wrap(function _callee4$(_context4) {
      while (1) switch (_context4.prev = _context4.next) {
        case 0:
          id = req.params.id;
          _req$body2 = req.body, name = _req$body2.name, surname = _req$body2.surname, email = _req$body2.email, password = _req$body2.password, profilePicture = _req$body2.profilePicture, bio = _req$body2.bio, instagram = _req$body2.instagram, facebook = _req$body2.facebook, tiktok = _req$body2.tiktok, twitter = _req$body2.twitter, playlists = _req$body2.playlists, following = _req$body2.following, followers = _req$body2.followers;
          _context4.prev = 2;
          _context4.next = 5;
          return existingUser(false, id);
        case 5:
          exists = _context4.sent;
          if (!(exists === false)) {
            _context4.next = 8;
            break;
          }
          return _context4.abrupt("return", res.status(404).json({
            status: "failed",
            message: "User with id ".concat(id, " does not exist")
          }));
        case 8:
          updated = {};
          if (name) {
            updated.name = name;
          }
          if (surname) {
            updated.surname = surname;
          }
          if (email) {
            updated.email = email;
          }
          if (password) {
            updated.password = password;
          }
          if (profilePicture) {
            updated.profilePicture = profilePicture;
          }
          if (bio) {
            updated.bio = bio;
          }
          if (instagram) {
            updated.instagram = instagram;
          }
          if (facebook) {
            updated.facebook = facebook;
          }
          if (tiktok) {
            updated.tiktok = tiktok;
          }
          if (twitter) {
            updated.twitter = twitter;
          }
          if (playlists) {
            updated.playlists = playlists;
          }
          if (following) {
            updated.following = following;
          }
          if (followers) {
            updated.followers = followers;
          }
          _context4.next = 24;
          return db.collection("users").updateOne({
            id: parseInt(id)
          }, {
            $set: updated
          });
        case 24:
          res.status(200).json({
            status: "success",
            message: "user updated successfully"
          });
          _context4.next = 31;
          break;
        case 27:
          _context4.prev = 27;
          _context4.t0 = _context4["catch"](2);
          console.error("Error when updating user ", _context4.t0);
          res.status(500).json({
            status: "failed",
            message: "Could not update user"
          });
        case 31:
        case "end":
          return _context4.stop();
      }
    }, _callee4, null, [[2, 27]]);
  }));
  return function (_x9, _x10) {
    return _ref4.apply(this, arguments);
  };
}());

//get user by id
app.get("/api/users/:id", /*#__PURE__*/function () {
  var _ref5 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee5(req, res) {
    var id, exists, user;
    return _regeneratorRuntime().wrap(function _callee5$(_context5) {
      while (1) switch (_context5.prev = _context5.next) {
        case 0:
          id = req.params.id;
          _context5.prev = 1;
          _context5.next = 4;
          return existingUser(false, id);
        case 4:
          exists = _context5.sent;
          if (!(exists === false)) {
            _context5.next = 7;
            break;
          }
          return _context5.abrupt("return", res.status(404).json({
            status: "failed",
            message: "User with is ".concat(id, " does not exist")
          }));
        case 7:
          _context5.next = 9;
          return db.collection("users").findOne({
            id: parseInt(id)
          });
        case 9:
          user = _context5.sent;
          res.status(200).json({
            status: "success",
            user: user
          });
          _context5.next = 17;
          break;
        case 13:
          _context5.prev = 13;
          _context5.t0 = _context5["catch"](1);
          console.error("Error when getting user by id", _context5.t0);
          res.status(500).json({
            status: "failed",
            message: "Could not get user by id"
          });
        case 17:
        case "end":
          return _context5.stop();
      }
    }, _callee5, null, [[1, 13]]);
  }));
  return function (_x11, _x12) {
    return _ref5.apply(this, arguments);
  };
}());

//login
app.post("/api/users/login", /*#__PURE__*/function () {
  var _ref6 = _asyncToGenerator(/*#__PURE__*/_regeneratorRuntime().mark(function _callee6(req, res) {
    var _req$body3, email, password, user;
    return _regeneratorRuntime().wrap(function _callee6$(_context6) {
      while (1) switch (_context6.prev = _context6.next) {
        case 0:
          _req$body3 = req.body, email = _req$body3.email, password = _req$body3.password;
          _context6.prev = 1;
          if (!(!email || !password)) {
            _context6.next = 4;
            break;
          }
          return _context6.abrupt("return", res.status(400).json({
            status: "failed",
            message: "email or password missing"
          }));
        case 4:
          _context6.next = 6;
          return db.collection("users").findOne({
            email: email
          });
        case 6:
          user = _context6.sent;
          if (user) {
            _context6.next = 9;
            break;
          }
          return _context6.abrupt("return", res.status(401).json({
            status: "failed",
            message: "email incorrect"
          }));
        case 9:
          if (!(password !== user.password)) {
            _context6.next = 11;
            break;
          }
          return _context6.abrupt("return", res.status(401).json({
            status: "failed",
            message: "password incorrect"
          }));
        case 11:
          res.status(200).json({
            status: "success",
            message: "login successful",
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
          _context6.next = 18;
          break;
        case 14:
          _context6.prev = 14;
          _context6.t0 = _context6["catch"](1);
          console.error("Error when login ", _context6.t0);
          res.status(500).json({
            status: "failed",
            message: "could not login"
          });
        case 18:
        case "end":
          return _context6.stop();
      }
    }, _callee6, null, [[1, 14]]);
  }));
  return function (_x13, _x14) {
    return _ref6.apply(this, arguments);
  };
}());

//

//docker build -t image .

//docker run --name express -p 3005:3000 image