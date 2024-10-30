import { buildFeedbackPath, extractFeedback } from '../feedback/index';

export default function handler(req, res) {
  const feedbackId = req.query.feedbackId;
  const filePath = buildFeedbackPath();
  const feedbackdata = extractFeedback(filePath);
  const selectedFeedback = feedbackdata.find(
    (feedback) => feedback.id === feedbackId,
  );
  res.status(200).json({ feedback: selectedFeedback });
}
