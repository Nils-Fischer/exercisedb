import json
import csv
import sys

def json_to_csv(input_file, output_file):
    # Read JSON data
    with open(input_file, 'r', encoding='utf-8') as f:
        data = json.load(f)

    # Prepare CSV file
    with open(output_file, 'w', newline='', encoding='utf-8') as f:
        writer = csv.DictWriter(f, fieldnames=[
            'name', 'level', 'mechanic', 'equipment', 'primary_muscles', 'secondary_muscles', 'instructions', 'category', 'images', 'tag', "priority"
        ])
        writer.writeheader()

        # Write data
        for item in data:
            row = {
                'name': item['name'],
                'level': item['level'],
                'mechanic': item['mechanic'],
                'equipment': item['equipment'],
                'primary_muscles': json.dumps(item['primaryMuscles'], ensure_ascii=False),
                'secondary_muscles': json.dumps(item['secondaryMuscles'], ensure_ascii=False),
                'instructions': json.dumps(item['instructions'], ensure_ascii=False),
                'category': json.dumps(item['category'] if isinstance(item['category'], list) else [item['category']], ensure_ascii=False),
                'images': json.dumps(item['images'], ensure_ascii=False),
                "tag": json.dumps(item["tag"], ensure_ascii=False),
                "priority": item["priority"]
            }
            writer.writerow(row)

    print(f"CSV file '{output_file}' has been created successfully.")

if __name__ == "__main__":
    if len(sys.argv) != 3:
        print("Usage: python script.py input.json output.csv")
        sys.exit(1)

    input_file = sys.argv[1]
    output_file = sys.argv[2]
    json_to_csv(input_file, output_file)
