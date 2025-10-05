export type EstimatedDiameter = {
  estimated_diameter_min: number;
  estimated_diameter_max: number;
};

export type CloseApproach = {
  close_approach_date: string;
  close_approach_date_full: string;
  epoch_date_close_approach: number;
  relative_velocity: {
    kilometers_per_second: string;
    kilometers_per_hour: string;
    miles_per_hour: string;
  };
  miss_distance: {
    astronomical: string;
    lunar: string;
    kilometers: string;
    miles: string;
  };
  orbiting_body: string;
};

export type NEODescriptor = {
  links: {
    self: string;
  };
  id: `${number}`;
  neo_reference_id: `${number}`;
  name: string;
  nasa_jpl_url: string;
  absolute_magnitude_h: number;
  estimated_diameter: {
    kilometers: EstimatedDiameter;
    meters: EstimatedDiameter;
    miles: EstimatedDiameter;
    feet: EstimatedDiameter;
  };
  is_potentially_hazardous_asteroid: boolean;
  close_approach_data: CloseApproach[];
} & (
  | { is_sentry_object: true; sentry_data: string }
  | { is_sentry_object: false }
);

export type Data = {
  links: {
    next: string;
    previous: string;
    self: string;
  };
  element_count: number;
  near_earth_objects: {
    [key: `${number}-${number}-${number}`]: NEODescriptor[];
  };
};
