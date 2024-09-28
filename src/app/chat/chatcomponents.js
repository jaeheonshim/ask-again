export function DefaultTextComponent() {
    <MarkdownRenderer
    content={`${message.role === 'user' ? 'You' : 'Bandage'}: ${message.parts}`}
    />
}