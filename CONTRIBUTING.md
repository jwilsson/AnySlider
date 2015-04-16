# Contributing to AnySlider
You want to contribute to AnySlider? Awesome! Just be sure to read these guidelines first.

## Issues
Please submit all your bug reports, feature requests and pull requests here but note that this isn't the place for support requests. Please use [Stack Overflow](https://stackoverflow.com/) for this.

## Bug reports

1. Search the issues, have it already been reported?
2. Download the latest commit from the `develop` branch, did this solve the problem?
3. Create a [reduced test case](https://css-tricks.com/reduced-test-cases/), does the problem still exist?
4. If the answer to all of the above questions are "No" then open a bug report and include the following:
    * A short, descriptive title.
    * A summary of the problem. Including browser and jQuery version.
    * The steps to reproduce the problem.
    * A link to your reduced test case.
    * Possible solutions or other relevant information/suggestions.

## Feature requests
Feature requests and other suggetions are more than welcome. Just be sure to ask and describe your suggestion first to make sure it's in the scope of this project.

## Pull requests
Pull requests fixing bugs or adding new features or enhancments are always appreciated. Remember to ask before beginning work on any significant changes (e.g. new features or refactoring code) so it isn't out of the scope of this project.

A simple guide on committing to AnySlider:

1. [Fork](https://help.github.com/articles/fork-a-repo/) AnySlider to your own repo.
2. Clone your fork to your computer:

    ```bash
    git clone https://github.com/<your-username>/AnySlider

    # Enter your new AnySlider directory
    cd AnySlider

    # Add the original repo as "upstream"
    git remote add upstream https://github.com/jwilsson/AnySlider
    ```

3. If you've cloned it a while back, be sure to get the latest changes:

    ```bash
    git checkout develop
    git pull upstream develop
    ```
If you're working on another branch, change "develop" to the name of that branch.

4. Create a new branch containg your fix or feature:

    ```bash
    git checkout -b <branch-name>
    ```

5. Don't just submit one big commit, break it up into smaller commits. Check out Git's [interactive rebase](https://help.github.com/articles/interactive-rebase) to clean up your commits.

6. Merge (or rebase) the original `develop` branch locally into your new branch.

    ```bash
    git pull [--rebase] upstream develop
    ```

7. Push your changes to your forked repo.

    ```bash
    git push origin <branch-name>
    ```

8. Open a pull request with a clear title and description.

Send all your pull requests to the `develop` branch. Or another apporitate feature/development branch. Never send pull requests to `master` since this is the stable branch. Pull requests sent there will not be merged.
