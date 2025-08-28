console.log('Hello, world!');
const fang_youren = new Set();
const fang_diren = new Set();
const telemetry_data = [];
const user_id_map = new Map();
function print_LogPlayerRevive(event) {
    return null;
}
function print_LogPlayerMakeGroggy(event) {
    return null;
}
function print_LogPlayerKillV2(event) {
    return null;
}
function print_LogPlayerUseThrowable(event) {
    return null;
}
function print_LogPlayerTakeDamage(event) {
    if (!event.attacker || !event.victim || fang_youren.size < 1) {
        return null;
    }
    const attackerId = event.attacker.accountId;
    const victimId = event.victim.accountId;
    const attackerName = user_id_map.get(attackerId) || attackerId;
    const victimName = user_id_map.get(victimId) || victimId;
    const attackerHealth = event.attacker.health.toFixed(2);
    const victimHealth = event.victim.health.toFixed(2);
    const damageInfo = `${event.damageTypeCategory} ${event.damageCauserName} 伤害 ${event.damage.toFixed(2)}`;
    const isAttackerFriend = fang_youren.has(attackerId);
    const isVictimFriend = fang_youren.has(victimId);
    const isAttackerEnemy = fang_diren.size >= 1 && fang_diren.has(attackerId);
    const isVictimEnemy = fang_diren.size >= 1 && fang_diren.has(victimId);
    if (isAttackerFriend && isVictimEnemy) {
        return {
            timestamp: event._D,
            direction: ">>",
            A: `${attackerName}[${attackerHealth}]`,
            B: damageInfo,
            C: `${victimName}[${victimHealth}]`
        };
    }
    if (isAttackerEnemy && isVictimFriend) {
        return {
            timestamp: event._D,
            direction: "<<",
            A: `${victimName}[${victimHealth}]`,
            B: damageInfo,
            C: `${attackerName}[${attackerHealth}]`
        };
    }
    if (isAttackerFriend) {
        return {
            timestamp: event._D,
            direction: ">>",
            A: `${attackerName}[${attackerHealth}] `,
            B: damageInfo,
            C: `${victimName}[${victimHealth}]`
        };
    }
    if (isVictimFriend) {
        return {
            timestamp: event._D,
            direction: "<<",
            A: `${victimName}[${victimHealth}]`,
            B: damageInfo,
            C: `${attackerName}[${attackerHealth}]`
        };
    }
    return null;
}
function rendertemlog() {
    document.getElementById('telemetry').innerHTML = ''; // Clear existing content
    let x = "";
    const table = document.createElement('table');
    table.style.borderCollapse = 'collapse';
    table.style.width = '100%';
    table.style.border = '1px solid black';
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    const headers = ['Timestamp', 'A', 'Direction', 'B', 'Direction', 'C'];
    headers.forEach(headerText => {
        const th = document.createElement('th');
        th.textContent = headerText;
        th.style.border = '1px solid black';
        th.style.textAlign = 'center';
        headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);
    const tbody = document.createElement('tbody');
    for (const item of telemetry_data) {
        let x1 = null;
        switch (item._T) {
            case 'LogPlayerTakeDamage':
                x1 = print_LogPlayerTakeDamage(item);
                break;
            case 'LogPlayerRevive':
                x1 = print_LogPlayerRevive(item);
                break;
            case 'LogPlayerMakeGroggy':
                x1 = print_LogPlayerMakeGroggy(item);
                break;
            case 'LogPlayerKillV2':
                x1 = print_LogPlayerKillV2(item);
                break;
            case 'LogPlayerUseThrowable':
                x1 = print_LogPlayerUseThrowable(item);
                break;
            default:
                continue;
        }
        if (x1) {
            const { timestamp, direction, A, B, C } = x1;
            const row = document.createElement('tr');
            row.style.backgroundColor = direction === '<<' ? '#E6F0FA' : direction === '>>' ? '#FFF5F5' : 'white';
            const cells = [timestamp, A, direction, B, direction, C];
            cells.forEach(cellText => {
                const td = document.createElement('td');
                td.textContent = cellText;
                td.style.border = '1px solid black';
                td.style.textAlign = 'center';
                row.appendChild(td);
            });
            tbody.appendChild(row);
        }
    }
    table.appendChild(tbody);
    document.getElementById('telemetry').appendChild(table); // Update content
}
function renderItems(items) {
    const container = document.getElementById('items');
    container.innerHTML = ''; // Clear existing content
    for (const [key, value] of items) {
        const itemDiv = document.createElement('div');
        itemDiv.className = 'team-container';
        // Team header
        const header = document.createElement('div');
        header.className = 'team-header';
        header.textContent = `Team ${key}`;
        itemDiv.appendChild(header);
        // Team members with checkboxes
        // console.log(value);
        value.forEach(xx => {
            const memberRow = document.createElement('div');
            memberRow.className = 'member-row';
            const memberName = document.createElement('span');
            memberName.textContent = user_id_map.get(xx) || '';
            const checkboxes = document.createElement('div');
            checkboxes.className = 'checkboxes';
            const checkbox1 = document.createElement('input');
            checkbox1.type = 'checkbox';
            checkbox1.id = `team${key}-${xx}-check1`;
            checkbox1.addEventListener('change', function () {
                if (this.checked) {
                    fang_youren.add(xx);
                    rendertemlog();
                }
                else {
                    fang_youren.delete(xx);
                    rendertemlog();
                }
            });
            const checkbox2 = document.createElement('input');
            checkbox2.type = 'checkbox';
            checkbox2.id = `team${key}-${xx}-check2`;
            checkbox2.addEventListener('change', function () {
                if (this.checked) {
                    fang_diren.add(xx);
                    rendertemlog();
                }
                else {
                    fang_diren.delete(xx);
                    rendertemlog();
                }
            });
            checkboxes.appendChild(checkbox1);
            checkboxes.appendChild(checkbox2);
            memberRow.appendChild(memberName);
            memberRow.appendChild(checkboxes);
            itemDiv.appendChild(memberRow);
        });
        container.appendChild(itemDiv);
    }
}
function get_items(_telemetry_data) {
    const items = new Map();
    for (const item of _telemetry_data) {
        if (item["_T"] === 'LogMatchStart') {
            for (const character of item["characters"]) {
                // console.log(character);
                const item_user_name = character["character"]["name"];
                if (character["character"]["type"] == "user_ai") {
                    user_id_map.set(character["character"]["accountId"], item_user_name + "(ai)");
                }
                else {
                    user_id_map.set(character["character"]["accountId"], item_user_name);
                }
                const item_id = character["character"]["teamId"];
                if (items.has(item_id)) {
                    items.get(item_id)?.push(character["character"]["accountId"]);
                }
                else {
                    items.set(item_id, [character["character"]["accountId"]]);
                }
            }
        }
    }
    // console.log(items);
    renderItems(items);
}
// fetch('./telemetry_test.json').then(response => {
//     if (response.ok) {
//         response.json().then(data => {
//             for (const item of data) {
//                 telemetry_data.push(item);
//             }
//             console.log(telemetry_data.length);
//             get_items(telemetry_data);
//         });
//     } else {
//         console.error('Network response was not ok');
//     }
// }).catch(error => console.log(error));
function load_match() {
    // const pubg_key = document.getElementById('pubg_key').value
    const pubg_match = document.getElementById('pubg_match').value.trim();
    if (pubg_match.length == 0) {
        alert('请输入比赛ID');
        return;
    }
    const pubg_match_url = `https://api.pubg.com/shards/psn/matches/${pubg_match}`;
    fetch(pubg_match_url, { headers: { "Accept": "application/vnd.api+json" } }).then(response => {
        if (response.ok) {
            // console.log(response.json())
            response.json().then(data => {
                if ("included" in data) {
                    for (const player of data.included) {
                        if (player.type == "asset" && "attributes" in player && player["attributes"]["name"] == "telemetry") {
                            const telemetry_url = player["attributes"]["URL"];
                            console.log(`Telemetry URL: ${telemetry_url}`);
                            fetch(telemetry_url).then(response => {
                                if (response.ok) {
                                    response.json().then(data1 => {
                                        for (const item of data1) {
                                            telemetry_data.push(item);
                                        }
                                        console.log(telemetry_data.length);
                                        get_items(telemetry_data);
                                    });
                                }
                            });
                        }
                    }
                }
                console.log(telemetry_data.length);
                get_items(telemetry_data);
            });
        }
        else {
            console.error('Network response was not ok');
        }
    }).catch(error => console.log(error));
}
document.getElementById('loadMatch').addEventListener('click', load_match);
export {};
//# sourceMappingURL=main.js.map