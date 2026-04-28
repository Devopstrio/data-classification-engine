import re
import logging

class ClassificationEngine:
    def __init__(self):
        self.logger = logging.getLogger("classifier")
        # Pre-defined regex patterns for PII
        self.patterns = {
            "EMAIL": r"[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+",
            "SSN": r"\d{3}-\d{2}-\d{4}",
            "CREDIT_CARD": r"\d{4}-\d{4}-\d{4}-\d{4}",
            "IPV4": r"\b\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}\b"
        }

    def scan_text(self, text: str):
        """
        Scans a block of text against the defined PII patterns.
        """
        findings = []
        for label, pattern in self.patterns.items():
            matches = re.finditer(pattern, text)
            for match in matches:
                findings.append({
                    "label": label,
                    "match": match.group(),
                    "start": match.start(),
                    "end": match.end(),
                    "confidence": 0.95 # Base confidence for regex
                })
        return findings

    def calculate_risk_score(self, findings: list):
        """
        Calculates a risk score based on the number and severity of findings.
        """
        severity_map = {
            "EMAIL": 1,
            "SSN": 10,
            "CREDIT_CARD": 10,
            "IPV4": 2
        }
        
        total_risk = sum(severity_map.get(f["label"], 1) for f in findings)
        return min(100, total_risk)

if __name__ == "__main__":
    engine = ClassificationEngine()
    test_text = "Contact us at support@example.com. My SSN is 123-45-6789."
    
    results = engine.scan_text(test_text)
    risk = engine.calculate_risk_score(results)
    
    print(f"Findings: {results}")
    print(f"Calculated Risk Score: {risk}/100")
