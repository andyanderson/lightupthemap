Hack for Western Mass process for working on this site.
----
* Pick and issue from the queue
* Make a branch and name it after the issue number, example 12345-fix-css
* Do your work in that branch
* Push that branch: `git push origin 12345-fix-css`
* File a pull request through the Github UI

Deploying to Pantheon
----
* Pick a pull request
* Reveiwed it however you like.
* When all OK, merge the PR on Github.
* Do `git checkout master`
* On local, `git fetch github`
* Then `git merge github/master`
* Then push to Pantheon: `git push origin master`

Other Notes
----
* Need instructions for how to set up site locally (settings.local.php)
* Need instructions for what is needed for gulp setup (for sass)
* How to get developers the database needed?

