import data_query as dq

def main():
    # Prompt user for file name w/o file type, default name is asteroid_data
    file_name = input("Enter file name w/o file type (Default=asteroid_data): ") or "asteroid_data"

    # Query data into json
    dq.query_data(file_name)

    # Create a filtered csv from the json
    dq.json_to_csv(file_name)

    #
    


if __name__ == "__main__":
    main()