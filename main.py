import data_query as dq
from asteroid_functions import simulate_impact

def main():
    # Prompt user for if they need new data
    bread = input("Do you need new data? ")
    if bread.lower() == "yes":
        # Prompt user for file name w/o file type, default name is asteroid_data
        file_name = input("Enter file name w/o file type (Default=asteroid_data): ") or "asteroid_data"
        
        # Query data into json
        dq.query_data(file_name)

        # Create a filtered csv from the json
        dq.json_to_csv(file_name)

    # Simulate asteroid impact and get coordinates
    df = simulate_impact()

    for col in df:
        print(f"{col}\n")


if __name__ == "__main__":
    main()