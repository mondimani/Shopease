export default async function handler(req, res) {
  const tips = [
    "🛍️ Browse featured deals daily!",
    "🔍 Use filters to narrow your search.",
    "🎁 Apply code WELCOME25 for 25% off.",
    "📦 Check orders in your dashboard.",
    "❤️ Add favorites to your wishlist!"
  ];

  res.status(200).json({ tips });
}
