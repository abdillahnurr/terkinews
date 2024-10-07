# TerkiNews Website Documentation

## Overview

TerkiNews is a dynamic news aggregation platform that provides up-to-date information across various categories including general news, technology, and specific regional news like Indonesian news. The website features responsive design and interactivity, allowing users to save articles, search for specific topics, and browse through different news categories.

## Features

- **Dynamic News Content:** Fetches the latest news articles from various sources.
- **Search Functionality:** Allows users to search for news articles by keywords.
- **Save Articles:** Users can save articles to view later.
- **Responsive Design:** Adapts smoothly to different screen sizes and devices.

## Technologies

- **React:** Utilizes React framework for building the user interface.
- **Redux:** Manages the global state of the application.
- **React Router:** Handles routing for the web application.
- **Bootstrap:** Provides styles and responsive layout.
- **FontAwesome:** Offers icons for user interface enhancement.

## Components

### Navigation Bar

- **File:** `NavigationBar.jsx`
- **Description:** Displays the top navigation menu including links to various parts of the website and a search bar.

### News Card

- **File:** `NewsCard.jsx`
- **Description:** Represents a single news article with headline, image, and a brief summary. Includes buttons to save/unsave and read more.

### Footer

- **File:** `Footer.jsx`
- **Description:** Displays the footer with copyright information, a link to the privacy policy, and social media icons.

### Pages

- **Home Page**
  - Shows the most recent news articles.
- **Indonesia Page**
  - Focuses on news specifically from or about Indonesia.
- **Saved Articles Page**
  - Allows users to view their saved news articles.
- **Programming Page**
  - Curates news related to technology and programming.

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://example.com/terkinews.git

2. **Clone the repository:**
   ```bash
   cd terkinews
   npm install

3. **Clone the repository:**
   ```bash
   npm run dev

## Usage

After installation, the application will be running on http://localhost:5173. Navigate using the links in the navigation bar or by entering search terms in the search bar.

## Contributing

Contributions are welcome. Please fork the repository and submit a pull request with your features or fixes.
