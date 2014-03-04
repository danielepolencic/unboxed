# EXERCISE 1
We would like the candidate to build a simple web or command line application, which should allow users to enter an arbitrary GitHub username, and be presented with a best guess of the GitHub user's favourite programming language.
This can be computed by using the GitHub API to fetch all of the user's public GitHub repos, each of which includes the name of the dominant language for the repository.
Documentation for the GitHub API can be found at [http://developer.github.com](http://developer.github.com).
Any programming language and technology (within reason) can be used to complete the test.

### Deployment to Heroku
Add the following custom buildpack:

```shell
$ heroku config:set \
  BUILDPACK_URL='git://github.com/qnyp/heroku-buildpack-ruby-bower.git#run-bower'
```

## Post Deployment
Run the following command:

```shell
$ heroku run rake assetpack:build -a favouritelanguage
```
