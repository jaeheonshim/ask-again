// components/MarkdownRenderer.js
import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/github.css'; // Use a theme for code highlighting

const MarkdownRenderer = ({ content }) => {
  return (
    <ReactMarkdown
      children={content}
      rehypePlugins={[rehypeHighlight]}
      className="markdown-content"
    />
  );
};

export default MarkdownRenderer;
