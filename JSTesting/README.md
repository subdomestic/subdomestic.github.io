# Feed Reader Testing

This project is web-based application that reads RSS feeds. It uses jasmine behaviour-driven framework to test different features of the application. It has four test suites that shows that all the features implemented by the feed reader work.

To get started, check out the repository and inspect the code.

To run the project clone the github repository and open index.html in your internet browser.

## Usage
To use the feeder reader just click any link to navigate to different websites. You can use the menu to navigate through different websites according to the content you want to read.

## Features
- Use jasmine behaviour-dirven framework to test the javascript code
- seven different tests that asssure the javascript code is correct.
- Four different suites were implemented to test the Feed reader
- Asyncrnous testing was implemented
- Filter map markers and list location according to user's input
- First test suite loops through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty. It also loops through each feed in the allFeeds object and ensures it has a name defined and that the name is not empty.
- Second test suite ensures the menu element is hidden by default and ensures the menu changes visibility when the menu icon is clicked.
- Third test suite ensures when the loadFeed function is called and completes its work, there is at least a single .entry element within the .feed container.
- Foutrh test suite ensures when a new feed is loaded by the loadFeed function that the content actually changes.
- All tests pass ensure the integrity of the web-based application
