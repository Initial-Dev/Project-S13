import Document, { Head, Html, Main, NextScript } from 'next/document';
import React from 'react';

class MyDocument extends Document {
	render() {
		return (
			<Html lang="en">
				<Head />
				<body className="bg-light dark:bg-dark">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
