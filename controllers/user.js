const db = require('../models');

const User = db.User;
const Op = db.Sequelize.Op

// Create and Save a new Tutorial
exports.create = (req, res) => {
  const { username, password } = req.body
  if (!username || !password) {
    res.status(400).json({
      error: 1,
      data: null,
      message: 'Username or password is required'
    });
    return;
  }

  const user = {
    username,
    password,
    token: "Token here"
  }

  User.create(user)
    .then(data => {
      res.json({
        error: 0,
        data,
        message: 'Create user success'
      });
    })
    .catch(err => {
      console.log(err)
      res.status(500).send({
        error: err,
        data: null,
        message: 'Some error occurred while creating the User'
      });
    });
};

exports.findAll = (req, res) => {
  const username = req.query.username;
  var condition = username ? { username: { [Op.like]: `%${username}%` } } : null;

  User.findAll({ where: condition })
    .then(data => {
      res.json({
        error: 0,
        data,
        message: 'Get User success'
      });
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        data: null,
        message: 'Some error occurred while creating the User'
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  User.findByPk(id)
    .then(data => {
      res.json({
        error: 0,
        data,
        message: 'Get User success'
      });
    })
    .catch(err => {
      res.status(500).send({
        error: err,
        data: null,
        message: 'Some error occurred while creating the User'
      });
    });
};

exports.update = (req, res) => {
  const id = req.params.id;

  User.update(req.body, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.json({
          error: 0,
          data: null,
          message: 'Get User success'
        });
      } else {
        res.status(200).send({
          error: 0,
          data: null,
          message: `Cannot update User with id=${id}. Maybe User was not found or req.body is empty!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        error: 0,
        data: null,
        message: "Error updating User with id=" + id
      });
    });
};

exports.delete = (req, res) => {
  const id = req.params.id;

  User.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "User was deleted successfully!"
        });
      } else {
        res.send({
          message: `Cannot delete USer with id=${id}. Maybe USer was not found!`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Could not delete USer with id=" + id
      });
    });
};

exports.deleteAll = (req, res) => {
  User.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send({ message: `${nums} Tutorials were deleted successfully!` });
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all tutorials."
      });
    });
};

exports.findAllPublished = (req, res) => {
  User.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials."
      });
    });
};