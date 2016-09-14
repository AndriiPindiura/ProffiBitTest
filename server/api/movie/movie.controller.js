/**
 * Using Rails-like standard naming convention for endpoints.
 * GET     /api/moviess              ->  index
 * POST    /api/moviess              ->  create
 * GET     /api/moviess/:id          ->  show
 * PUT     /api/moviess/:id          ->  upsert
 * PATCH   /api/moviess/:id          ->  patch
 * DELETE  /api/moviess/:id          ->  destroy
 */

'use strict';

import jsonpatch from 'fast-json-patch';
import Movies from './movie.model';

function respondWithResult(res, statusCode) {
  statusCode = statusCode || 200;
  return function(entity) {
    if(entity) {
      return res.status(statusCode).json(entity);
    }
    return null;
  };
}

function patchUpdates(patches) {
  return function(entity) {
    try {
      jsonpatch.apply(entity, patches, /*validate*/ true);
    } catch(err) {
      return Promise.reject(err);
    }

    return entity.save();
  };
}

function removeEntity(res) {
  return function(entity) {
    if(entity) {
      return entity.remove()
        .then(() => {
          res.status(204).end();
        });
    }
  };
}

function handleEntityNotFound(res) {
  return function(entity) {
    if(!entity) {
      res.status(404).end();
      return null;
    }
    return entity;
  };
}

function handleError(res, statusCode) {
  statusCode = statusCode || 500;
  return function(err) {
    res.status(statusCode).send(err);
  };
}

// Gets a list of Moviess
export function index(req, res) {
  return Movies.find().exec()
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Gets a single Movies from the DB
export function show(req, res) {
  return Movies.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Creates a new Movies in the DB
export function create(req, res) {
  return Movies.create(req.body)
    .then(respondWithResult(res, 201))
    .catch(handleError(res));
}

// Upserts the given Movies in the DB at the specified ID
export function upsert(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Movies.findOneAndUpdate(req.params.id, req.body, {upsert: true, setDefaultsOnInsert: true, runValidators: true}).exec()

    .then(respondWithResult(res))
    .catch(handleError(res));
}

export function importMovies(req, res) {
  req.body.forEach(movie => {
    Movies.create(movie).catch(error => console.log(error));
  });
  res.status('201').end();
}


// Updates an existing Movies in the DB
export function patch(req, res) {
  if(req.body._id) {
    delete req.body._id;
  }
  return Movies.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(patchUpdates(req.body))
    .then(respondWithResult(res))
    .catch(handleError(res));
}

// Deletes a Movies from the DB
export function destroy(req, res) {
  return Movies.findById(req.params.id).exec()
    .then(handleEntityNotFound(res))
    .then(removeEntity(res))
    .catch(handleError(res));
}
