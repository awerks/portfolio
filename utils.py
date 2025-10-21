def is_spam(message: str) -> bool:
    bot_indicators = ["seo", "income", "passive", "earn", "ranking", "crypto", "sales"]
    words = message.lower().split()
    for indicator in bot_indicators:
        if indicator in words:
            return True
    return False
