#!/bin/bash
echo ##################### Begin
knex migrate:rollback
knex migrate:latest
knex seed:run 
echo ##################### End
