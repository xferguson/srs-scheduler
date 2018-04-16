# SRS Scheduler
This is just a simple js script to run in node where you supply a number of flash cards to learn per day, how many days you intend to learn them, and which system you will be using (currently just "Memrise" and "ClozeMaster", defaulting to "Memrise"). It then spits out a schedule so you can see how many cards you will have to review each day.

run with `npm start [batchSize] [days] [mode]`

The SRS algorithms were taken from the Memrise website message boards and the Clozemaster website.

To see the output in a visual format (using React & Plotly), check out the [sample page](https://xferguson.github.io/srs-scheduler/)
