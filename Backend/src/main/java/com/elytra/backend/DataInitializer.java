package com.elytra.backend;

import com.elytra.backend.Models.Survey;
import com.elytra.backend.Repository.SurveyRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class DataInitializer {

    @Bean
    CommandLineRunner initSurveys(SurveyRepository surveyRepository) {
        return args -> {
            // Check if surveys already exist
            if (surveyRepository.count() > 0) {
                System.out.println("Surveys already initialized");
                return;
            }

            // Survey 1: Comprehensive Community Safety Assessment
            Survey survey1 = new Survey();
            survey1.setTitle("Comprehensive Community Safety Assessment");
            survey1.setDescription(
                    "Your input is crucial in helping us create a safer community for everyone. This comprehensive survey covers various aspects of community safety, from street lighting to emergency response times. Your honest feedback will directly influence our safety improvement initiatives and resource allocation for the upcoming year. All responses are confidential and will be used solely for community development purposes.");
            survey1.setQuestions(
                    "[{\"id\":\"q1\",\"question\":\"On a scale of 1-10, how safe do you feel walking in your neighborhood during daytime?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q2\",\"question\":\"On a scale of 1-10, how safe do you feel walking in your neighborhood during nighttime?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q3\",\"question\":\"What are your primary safety concerns in the community? (Select all that apply)\",\"type\":\"checkbox\",\"options\":[\"Inadequate street lighting\",\"High crime rates\",\"Dangerous traffic conditions\",\"Lack of police presence\",\"Poorly maintained sidewalks\",\"Stray animals\",\"Drug-related activities\",\"Vandalism and property damage\",\"Other\"],\"required\":true},"
                            +
                            "{\"id\":\"q4\",\"question\":\"How would you rate the visibility and effectiveness of law enforcement in your area?\",\"type\":\"radio\",\"options\":[\"Excellent - Very visible and responsive\",\"Good - Adequate presence\",\"Fair - Occasionally visible\",\"Poor - Rarely seen\",\"Very Poor - Never visible\"],\"required\":true},"
                            +
                            "{\"id\":\"q5\",\"question\":\"Have you or anyone in your household experienced any safety incidents in the past 6 months?\",\"type\":\"radio\",\"options\":[\"Yes, multiple incidents\",\"Yes, one incident\",\"No incidents\",\"Prefer not to say\"],\"required\":true},"
                            +
                            "{\"id\":\"q6\",\"question\":\"How satisfied are you with the current street lighting in your neighborhood?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q7\",\"question\":\"What improvements would make you feel safer in your community? (Select top 3)\",\"type\":\"checkbox\",\"options\":[\"More street lights\",\"Increased police patrols\",\"CCTV cameras in public areas\",\"Better maintained roads and sidewalks\",\"Community watch programs\",\"Emergency call boxes\",\"Traffic calming measures\",\"Youth engagement programs\"],\"required\":true},"
                            +
                            "{\"id\":\"q8\",\"question\":\"Please share any specific locations or areas in the community that you feel are particularly unsafe and why. Your detailed feedback helps us prioritize improvements.\",\"type\":\"text\",\"required\":false}]");
            survey1.setIsActive(true);

            // Survey 2: Infrastructure and Urban Development Survey
            Survey survey2 = new Survey();
            survey2.setTitle("Infrastructure and Urban Development Survey");
            survey2.setDescription(
                    "As our community continues to grow, we need your valuable insights to guide our infrastructure development plans. This detailed survey examines the current state of roads, public transportation, utilities, and recreational facilities. Your responses will help us prioritize infrastructure projects, allocate budgets effectively, and ensure our community's development meets the needs of all residents. This survey takes approximately 8-10 minutes to complete.");
            survey2.setQuestions(
                    "[{\"id\":\"q1\",\"question\":\"How would you rate the overall condition of roads and streets in your area?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q2\",\"question\":\"How would you rate the condition of sidewalks and pedestrian pathways?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q3\",\"question\":\"Which infrastructure areas require immediate attention? (Select all that apply)\",\"type\":\"checkbox\",\"options\":[\"Road repairs and resurfacing\",\"Pothole filling\",\"Sidewalk repairs\",\"Street lighting installation/repair\",\"Drainage and sewage systems\",\"Water supply infrastructure\",\"Public transportation facilities\",\"Parks and green spaces\",\"Parking facilities\",\"Bicycle lanes\"],\"required\":true},"
                            +
                            "{\"id\":\"q4\",\"question\":\"How frequently do you use public transportation in the city?\",\"type\":\"radio\",\"options\":[\"Daily (5-7 days per week)\",\"Frequently (3-4 days per week)\",\"Occasionally (1-2 days per week)\",\"Rarely (few times per month)\",\"Never\"],\"required\":true},"
                            +
                            "{\"id\":\"q5\",\"question\":\"If you use public transportation, how satisfied are you with the service?\",\"type\":\"radio\",\"options\":[\"Very satisfied\",\"Satisfied\",\"Neutral\",\"Dissatisfied\",\"Very dissatisfied\",\"Not applicable - I don't use public transport\"],\"required\":true},"
                            +
                            "{\"id\":\"q6\",\"question\":\"What improvements to public transportation would you like to see? (Select all that apply)\",\"type\":\"checkbox\",\"options\":[\"More frequent service\",\"Extended operating hours\",\"Additional routes\",\"Better maintained vehicles\",\"Real-time tracking apps\",\"Improved accessibility for disabled persons\",\"More bus stops/stations\",\"Lower fares\",\"Better safety measures\"],\"required\":false},"
                            +
                            "{\"id\":\"q7\",\"question\":\"How would you rate the availability and quality of parks and recreational facilities?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q8\",\"question\":\"What new infrastructure projects would most benefit your community? (Rank top 3)\",\"type\":\"checkbox\",\"options\":[\"New community center\",\"Sports complex\",\"Public library\",\"Swimming pool\",\"Children's playgrounds\",\"Senior citizen center\",\"Covered market area\",\"Public parking structure\",\"Cycling and jogging tracks\"],\"required\":true},"
                            +
                            "{\"id\":\"q9\",\"question\":\"How satisfied are you with the drainage system during heavy rainfall?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q10\",\"question\":\"Please provide any additional suggestions or specific infrastructure concerns you'd like to address. Include locations if applicable.\",\"type\":\"text\",\"required\":false}]");
            survey2.setIsActive(true);

            // Survey 3: Community Services and Quality of Life Survey
            Survey survey3 = new Survey();
            survey3.setTitle("Community Services and Quality of Life Survey");
            survey3.setDescription(
                    "We are committed to enhancing the quality of life for all community members. This comprehensive survey evaluates existing community services including healthcare, education, waste management, and recreational programs. Your detailed feedback will shape our service improvement strategies and help us identify gaps in current offerings. We value your time and appreciate your participation in building a better community. The survey covers multiple service areas and takes approximately 10-12 minutes to complete.");
            survey3.setQuestions(
                    "[{\"id\":\"q1\",\"question\":\"How would you rate your overall satisfaction with community services?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q2\",\"question\":\"How satisfied are you with waste collection and management services?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q3\",\"question\":\"How often is waste collected in your area?\",\"type\":\"radio\",\"options\":[\"Daily\",\"Every other day\",\"Twice a week\",\"Once a week\",\"Less than once a week\",\"Irregular schedule\"],\"required\":true},"
                            +
                            "{\"id\":\"q4\",\"question\":\"What improvements would you like to see in waste management? (Select all that apply)\",\"type\":\"checkbox\",\"options\":[\"More frequent collection\",\"Recycling programs\",\"Composting facilities\",\"Bulk waste pickup\",\"More public trash bins\",\"Hazardous waste disposal\",\"Better cleanliness of collection areas\",\"Electronic waste collection\"],\"required\":true},"
                            +
                            "{\"id\":\"q5\",\"question\":\"How would you rate the accessibility and quality of healthcare facilities in the community?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q6\",\"question\":\"What healthcare services are most needed in your community? (Select top 3)\",\"type\":\"checkbox\",\"options\":[\"24/7 emergency services\",\"Specialized clinics\",\"Dental care\",\"Mental health services\",\"Maternal and child health\",\"Elderly care facilities\",\"Pharmacy services\",\"Preventive health programs\",\"Affordable healthcare options\"],\"required\":true},"
                            +
                            "{\"id\":\"q7\",\"question\":\"How satisfied are you with educational institutions in the area?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q8\",\"question\":\"What educational facilities or programs would benefit the community? (Select all that apply)\",\"type\":\"checkbox\",\"options\":[\"More schools\",\"Vocational training centers\",\"Adult education programs\",\"Computer literacy classes\",\"Language courses\",\"After-school programs\",\"Library services\",\"Scholarship programs\",\"Special education facilities\"],\"required\":false},"
                            +
                            "{\"id\":\"q9\",\"question\":\"How would you rate the availability of recreational and cultural activities?\",\"type\":\"rating\",\"required\":true},"
                            +
                            "{\"id\":\"q10\",\"question\":\"What recreational facilities or programs would you like to see? (Select all that apply)\",\"type\":\"checkbox\",\"options\":[\"Sports facilities\",\"Community events\",\"Cultural programs\",\"Youth clubs\",\"Senior citizen activities\",\"Art and music classes\",\"Fitness centers\",\"Community gardens\",\"Movie theaters\"],\"required\":false},"
                            +
                            "{\"id\":\"q11\",\"question\":\"How responsive are community services to citizen complaints and requests?\",\"type\":\"radio\",\"options\":[\"Very responsive - Issues resolved quickly\",\"Responsive - Reasonable resolution time\",\"Somewhat responsive - Slow but eventual resolution\",\"Not responsive - Issues rarely resolved\",\"Never tried to report issues\"],\"required\":true},"
                            +
                            "{\"id\":\"q12\",\"question\":\"What new community services or programs would most improve your quality of life? Please be specific and explain how these services would benefit you and your family.\",\"type\":\"text\",\"required\":false}]");
            survey3.setIsActive(true);

            surveyRepository.save(survey1);
            surveyRepository.save(survey2);
            surveyRepository.save(survey3);

            System.out.println("Comprehensive professional surveys initialized successfully!");
        };
    }
}
